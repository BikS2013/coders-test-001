namespace BlazorDashboard.Models
{
    public class RatingCategory
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Min { get; set; }
        public int Max { get; set; }
    }
}
