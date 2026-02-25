// Models/Property.cs
using System.ComponentModel.DataAnnotations;

public class Property
{
    public int Id { get; set; }

    [Required]
    public string PropertyName { get; set; }

    public string PlotNo { get; set; }
    public string Location { get; set; }
    public string OwnerName { get; set; }
    public bool IsDeleted { get; set; } = false;
}

