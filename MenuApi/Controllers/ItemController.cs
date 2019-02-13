using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MenuApi.Models;
namespace MenuApi.Controllers
{
 [Route("api/[controller]")]
 [ApiController]
 public class ItemController : ControllerBase
 {
 private readonly ItemContext _context;
 public ItemController(ItemContext context)
 {
 _context = context;
 if (_context.Items.Count() == 0)
 {
 // Create a new Item if collection is empty,
 // which means you can't delete all MenuItems.
 _context.Items.Add(new Item { Name = "Cheeseburger", Price = "9.95" });
 _context.SaveChanges();
 }
 }
 // GET: api/Menu
 [HttpGet]
 public async Task<ActionResult<IEnumerable<Item>>> GetMenuItems()
 {
 return await _context.Items.ToListAsync();
 }
 
 // GET: api/Menu/5
 [HttpGet("{id}")]
 public async Task<ActionResult<Item>> GetMenuItem(long id)
 {
 var item = await _context.Items.FindAsync(id);
 if (item == null)
 {
 return NotFound();
 }
 return item;
 }
 // POST: api/Item
 [HttpPost]
 public async Task<ActionResult<Item>> PostMenuItem(Item item)
 {
 _context.Items.Add(item);
 await _context.SaveChangesAsync();
 return CreatedAtAction(nameof(GetMenuItem), new { id = item.Id }, item);
 }
 // PUT: api/Item/5
 [HttpPut("{id}")]
 public async Task<IActionResult> PutMenuItem(long id, Item item)
 {
 if (id != item.Id)
 {
 return BadRequest();
 }
 _context.Entry(item).State = EntityState.Modified;
 await _context.SaveChangesAsync();
 return NoContent();
 }
 
 // DELETE: api/Item/5
 [HttpDelete("{id}")]
 public async Task<IActionResult> DeleteItem(long id)
 {
 var item = await _context.Items.FindAsync(id);
 if (item == null)
 {
 return NotFound();
 }
 _context.Items.Remove(item);
 await _context.SaveChangesAsync();
 return NoContent();
 }
 }
}