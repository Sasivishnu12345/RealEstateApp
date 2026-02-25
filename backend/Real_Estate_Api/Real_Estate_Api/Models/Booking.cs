// Models/Booking.cs
using System;
using System.ComponentModel.DataAnnotations;

public class Booking
{
    public int Id { get; set; }

    public string PropertyName { get; set; }
    public string PlotNo { get; set; }
    public string CustomerName { get; set; }

    public DateTime BookingDate { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;
}

