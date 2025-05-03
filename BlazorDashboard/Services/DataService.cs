using BlazorDashboard.Models;

namespace BlazorDashboard.Services
{
    public class DataService
    {
        private readonly List<User> _allUsers;
        private readonly List<TimePeriod> _timePeriods;
        private readonly List<RatingCategory> _ratingCategories;
        private readonly Random _random = new Random();

        public DataService()
        {
            // Initialize sample users
            _allUsers = new List<User>
            {
                new User { Id = 1, Name = "User 1" },
                new User { Id = 2, Name = "User 2" },
                new User { Id = 3, Name = "User 3" },
                new User { Id = 4, Name = "User 4" },
                new User { Id = 5, Name = "User 5" }
            };

            // Initialize time periods
            _timePeriods = new List<TimePeriod>
            {
                new TimePeriod { Id = "last_day", Name = "Last Day", FromDate = DateTime.Now.AddDays(-1), ToDate = DateTime.Now },
                new TimePeriod { Id = "last_week", Name = "Last Week", FromDate = DateTime.Now.AddDays(-7), ToDate = DateTime.Now },
                new TimePeriod { Id = "last_month", Name = "Last Month", FromDate = DateTime.Now.AddDays(-30), ToDate = DateTime.Now },
                new TimePeriod { Id = "last_quarter", Name = "Last Quarter", FromDate = DateTime.Now.AddDays(-90), ToDate = DateTime.Now },
                new TimePeriod { Id = "last_year", Name = "Last Year", FromDate = DateTime.Now.AddDays(-365), ToDate = DateTime.Now }
            };

            // Initialize rating categories
            _ratingCategories = new List<RatingCategory>
            {
                new RatingCategory { Id = "heavily_negative", Name = "Heavily Negative", Min = -10, Max = -7 },
                new RatingCategory { Id = "mild_negative", Name = "Mild Negative", Min = -6, Max = -1 },
                new RatingCategory { Id = "neutral", Name = "Neutral", Min = -3, Max = 3 },
                new RatingCategory { Id = "mild_positive", Name = "Mild Positive", Min = 1, Max = 6 },
                new RatingCategory { Id = "heavily_positive", Name = "Heavily Positive", Min = 7, Max = 10 }
            };
        }

        public List<User> GetAllUsers() => _allUsers;

        public List<TimePeriod> GetTimePeriods() => _timePeriods;

        public List<RatingCategory> GetRatingCategories() => _ratingCategories;

        public List<ChartDataEntry> GenerateChartData(DateTime startDate, DateTime endDate)
        {
            var data = new List<ChartDataEntry>();
            
            var currentDate = new DateTime(startDate.Year, startDate.Month, startDate.Day);
            while (currentDate <= endDate)
            {
                // Generate random data for each rating category
                var entry = new ChartDataEntry
                {
                    Date = currentDate.ToString("MM/dd/yyyy"),
                    HeavilyNegative = _random.Next(10),
                    MildNegative = _random.Next(15),
                    Neutral = _random.Next(25),
                    MildPositive = _random.Next(20),
                    HeavilyPositive = _random.Next(15)
                };
                
                data.Add(entry);
                
                // Move to next date
                currentDate = currentDate.AddDays(1);
            }
            
            return data;
        }

        // Helper method to format date
        public string FormatDate(DateTime date) => date.ToString("MM/dd/yyyy");

        // Helper method to parse date
        public DateTime ParseDate(string date) => DateTime.Parse(date);
    }
}
