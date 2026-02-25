using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Real_Estate_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class PropertyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PropertyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL PROPERTIES
        // =========================
        [HttpGet]
        public IActionResult GetAll()
        {
            var properties = _context.Properties
                .Where(p => !p.IsDeleted)
                .Select(p => new
                {
                    p.Id,
                    p.PropertyName,
                    p.PlotNo,
                    p.Location,
                    p.OwnerName
                })
                .ToList();

            return Ok(properties);
        }

        // =========================
        // GET PROPERTY BY ID
        // =========================
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var property = _context.Properties
                .Where(p => !p.IsDeleted && p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.PropertyName,
                    p.PlotNo,
                    p.Location,
                    p.OwnerName
                })
                .FirstOrDefault();

            if (property == null)
                return NotFound(new { message = "Property not found" });

            return Ok(property);
        }

        // =========================
        // CREATE PROPERTY
        // =========================
        [HttpPost]
        public IActionResult Create([FromBody] Property model)
        {
            if (model == null)
                return BadRequest();

            var property = new Property
            {
                PropertyName = model.PropertyName,
                PlotNo = model.PlotNo,
                Location = model.Location,
                OwnerName = model.OwnerName,
                IsDeleted = false
            };

            _context.Properties.Add(property);
            _context.SaveChanges();

            return Ok(new { message = "Property created successfully" });
        }

        // =========================
        // UPDATE PROPERTY
        // =========================
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Property model)
        {
            var property = _context.Properties.Find(id);

            if (property == null || property.IsDeleted)
                return NotFound(new { message = "Property not found" });

            property.PropertyName = model.PropertyName;
            property.PlotNo = model.PlotNo;
            property.Location = model.Location;
            property.OwnerName = model.OwnerName;

            _context.SaveChanges();

            return Ok(new { message = "Property updated successfully" });
        }

        // =========================
        // DELETE PROPERTY (SOFT DELETE)
        // =========================
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var property = _context.Properties.Find(id);

            if (property == null)
                return NotFound(new { message = "Property not found" });

            property.IsDeleted = true;
            _context.SaveChanges();

            return Ok(new { message = "Property deleted successfully" });
        }
    }
}