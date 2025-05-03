namespace BlazorDashboard.Models
{
    public class ChartDataEntry
    {
        public string Date { get; set; } = string.Empty;
        public int HeavilyNegative { get; set; }
        public int MildNegative { get; set; }
        public int Neutral { get; set; }
        public int MildPositive { get; set; }
        public int HeavilyPositive { get; set; }
    }
}
