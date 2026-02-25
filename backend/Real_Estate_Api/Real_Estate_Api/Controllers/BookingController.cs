using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Real_Estate_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET ALL BOOKINGS
        [HttpGet]
        public IActionResult GetAll()
        {
            var bookings = _context.Bookings
                .Where(b => !b.IsDeleted)
                .Select(b => new
                {
                    b.Id,
                    b.PropertyName,
                    b.PlotNo,
                    b.CustomerName,
                    bookingDate = b.BookingDate.ToString("yyyy-MM-dd")
                })
                .ToList();

            return Ok(bookings);
        }

        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var booking = _context.Bookings
                .Where(b => b.Id == id && !b.IsDeleted)
                .Select(b => new
                {
                    b.Id,
                    b.PropertyName,
                    b.PlotNo,
                    b.CustomerName,
                    bookingDate = b.BookingDate.ToString("yyyy-MM-dd")
                })
                .FirstOrDefault();

            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

        // CREATE
        [HttpPost]
        public IActionResult Create([FromBody] Booking booking)
        {
            booking.BookingDate = DateTime.Now;
            _context.Bookings.Add(booking);
            _context.SaveChanges();
            return Ok();
        }

        // UPDATE
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Booking booking)
        {
            var existing = _context.Bookings.Find(id);
            if (existing == null) return NotFound();

            existing.PropertyName = booking.PropertyName;
            existing.PlotNo = booking.PlotNo;
            existing.CustomerName = booking.CustomerName;

            _context.SaveChanges();
            return Ok();
        }

        // DELETE (Soft)
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking == null) return NotFound();

            booking.IsDeleted = true;
            _context.SaveChanges();
            return Ok();
        }

        // GET PROPERTIES FOR DROPDOWN
        [HttpGet("properties")]
        public IActionResult GetProperties()
        {
            var properties = _context.Properties
                .Where(p => !p.IsDeleted)
                .Select(p => new
                {
                    propertyName = p.PropertyName,
                    plotNo = p.PlotNo
                })
                .ToList();

            return Ok(properties);
        }
    }
}