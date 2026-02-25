using Microsoft.AspNetCore.Mvc;

namespace Real_Estate_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;

        public AccountController(
            ApplicationDbContext context,
            IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register([FromBody] User model)
        {
            if (_context.Users.Any(u => u.Email == model.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // 🔥 HASH PASSWORD
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                Password = hashedPassword,   // store hash only
                Role = model.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User Registered Successfully" });
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == model.Email);

            if (user == null)
                return Unauthorized(new { message = "Invalid Email or Password" });

            // 🔥 VERIFY HASH
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.Password);

            if (!isPasswordValid)
                return Unauthorized(new { message = "Invalid Email or Password" });

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token });
        }

        // LOGOUT
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logged out successfully" });
        }
    }
}