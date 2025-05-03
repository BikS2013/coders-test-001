// Chart.js interop functions for Blazor
window.chartInterop = {
    // Initialize and create a bar chart
    createBarChart: function (canvasId, labels, datasets, isDarkMode) {
        // Destroy any existing chart with this ID
        this.destroyChart(canvasId);

        // Get the canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        // Get the 2D context
        const ctx = canvas.getContext('2d');

        // Set colors based on dark mode
        const gridColor = isDarkMode ? '#4b5563' : '#e5e7eb';
        const textColor = isDarkMode ? '#d1d5db' : '#374151';

        // Create the chart
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets.map(ds => ({
                    label: ds.label,
                    data: ds.data,
                    backgroundColor: ds.backgroundColor,
                    borderColor: ds.borderColor,
                    borderWidth: 1,
                    stack: 'stack1'
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: textColor
                        }
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                        titleColor: isDarkMode ? '#f9fafb' : '#111827',
                        bodyColor: isDarkMode ? '#f9fafb' : '#111827'
                    }
                }
            }
        });

        // Store the chart instance in a global object for later reference
        if (!window.chartInstances) window.chartInstances = {};
        window.chartInstances[canvasId] = chart;

        return true;
    },

    // Initialize and create a line chart
    createLineChart: function (canvasId, labels, data, label, color, isDarkMode) {
        // Destroy any existing chart with this ID
        this.destroyChart(canvasId);

        // Get the canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        // Get the 2D context
        const ctx = canvas.getContext('2d');

        // Set colors based on dark mode
        const gridColor = isDarkMode ? '#4b5563' : '#e5e7eb';
        const textColor = isDarkMode ? '#d1d5db' : '#374151';

        // Create the chart
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color + '40', // Add transparency
                    borderColor: color,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4, // Smooth curve
                    pointRadius: 3,
                    pointBackgroundColor: color,
                    pointBorderColor: isDarkMode ? '#1f2937' : '#ffffff',
                    pointBorderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: textColor
                        }
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                        titleColor: isDarkMode ? '#f9fafb' : '#111827',
                        bodyColor: isDarkMode ? '#f9fafb' : '#111827'
                    }
                }
            }
        });

        // Store the chart instance in a global object for later reference
        if (!window.chartInstances) window.chartInstances = {};
        window.chartInstances[canvasId] = chart;

        return true;
    },

    // Destroy a chart instance
    destroyChart: function (canvasId) {
        if (window.chartInstances && window.chartInstances[canvasId]) {
            window.chartInstances[canvasId].destroy();
            delete window.chartInstances[canvasId];
            return true;
        }
        return false;
    }
};
