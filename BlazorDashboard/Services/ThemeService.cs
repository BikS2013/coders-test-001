namespace BlazorDashboard.Services
{
    public class ThemeService
    {
        public bool IsDarkMode { get; private set; } = true;
        
        public event Action? OnThemeChanged;

        public void ToggleTheme()
        {
            IsDarkMode = !IsDarkMode;
            NotifyThemeChanged();
        }

        private void NotifyThemeChanged() => OnThemeChanged?.Invoke();
    }
}
