<script setup lang="ts">
import { ref, onMounted, watch, defineComponent, computed } from 'vue';
import { ChevronDown, Calendar, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-vue-next';

// Define interfaces
interface User {
  id: number;
  name: string;
}

interface TimePeriod {
  id: string;
  name: string;
  fromDate: Date;
  toDate: Date;
}

interface RatingCategory {
  id: string;
  name: string;
  min: number;
  max: number;
}

interface ChartDataEntry {
  date: string;
  heavily_negative: number;
  mild_negative: number;
  neutral: number;
  mild_positive: number;
  heavily_positive: number;
}

// Sample users
const allUsers: User[] = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
];

// Helper function to subtract days from a date
function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() - days);
  return result;
}

// Time period options
const timePeriods: TimePeriod[] = [
  { id: 'last_day', name: 'Last Day', fromDate: subtractDays(new Date(), 1), toDate: new Date() },
  { id: 'last_week', name: 'Last Week', fromDate: subtractDays(new Date(), 7), toDate: new Date() },
  { id: 'last_month', name: 'Last Month', fromDate: subtractDays(new Date(), 30), toDate: new Date() },
  { id: 'last_quarter', name: 'Last Quarter', fromDate: subtractDays(new Date(), 90), toDate: new Date() },
  { id: 'last_year', name: 'Last Year', fromDate: subtractDays(new Date(), 365), toDate: new Date() },
];

// Rating categories
const ratingCategories: RatingCategory[] = [
  { id: 'all', name: 'All Ratings', min: -10, max: 10 },
  { id: 'positive', name: 'Positive (1 to 10)', min: 1, max: 10 },
  { id: 'negative', name: 'Negative (-10 to -1)', min: -10, max: -1 },
  { id: 'neutral', name: 'Relatively Neutral (-3 to +3)', min: -3, max: 3 },
  { id: 'heavily_positive', name: 'Heavily Positive (7 to 10)', min: 7, max: 10 },
  { id: 'heavily_negative', name: 'Heavily Negative (-10 to -7)', min: -10, max: -7 },
  { id: 'mild_positive', name: 'Mild Positive (1 to 6)', min: 1, max: 6 },
  { id: 'mild_negative', name: 'Mild Negative (-6 to -1)', min: -6, max: -1 },
];

// State variables (using Vue's ref for reactivity)
const expandUsers = ref(false);
const selectedUsers = ref([...allUsers.map(u => u.id), 'all']);
const selectedTimePeriod = ref(timePeriods[1].id);
const fromDate = ref(formatDate(timePeriods[1].fromDate));
const toDate = ref(formatDate(timePeriods[1].toDate));
const selectedRatingCategories = ref(['all']);
const isDropdownOpen = ref(false);
const isTimeDropdownOpen = ref(false);
const showFromCalendar = ref(false);
const showToCalendar = ref(false);
const sidebarCollapsed = ref(false);
const sidebarWidth = ref(256); // Default width (64 * 4 = 256px)
const isResizing = ref(false);
const isDarkMode = ref(true); // Default to dark mode

// Format date to dd/mm/yyyy
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Parse date from dd/mm/yyyy
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// Handle user selection
function handleUserSelect(userId: number | string): void {
  if (userId === 'all') {
    if (selectedUsers.value.includes('all')) {
      selectedUsers.value = [];
    } else {
      selectedUsers.value = ['all', ...allUsers.map(u => u.id)];
    }
  } else {
    let newSelected = [...selectedUsers.value];

    if (newSelected.includes(userId)) {
      newSelected = newSelected.filter(id => id !== userId);
      if (newSelected.includes('all')) {
        newSelected = newSelected.filter(id => id !== 'all');
      }
    } else {
      newSelected.push(userId);
      if (newSelected.length === allUsers.length + 1 && !newSelected.includes('all')) {
        newSelected.push('all');
      }
    }

    selectedUsers.value = newSelected;
  }
}

// Handle time period selection
function handleTimePeriodSelect(periodId: string): void {
  selectedTimePeriod.value = periodId;
  const period = timePeriods.find(p => p.id === periodId);
  if (period) {
    fromDate.value = formatDate(period.fromDate);
    toDate.value = formatDate(period.toDate);
  }
  isTimeDropdownOpen.value = false;
}

// Handle rating category selection
function handleRatingCategorySelect(categoryId: string): void {
  if (categoryId === 'all') {
    if (selectedRatingCategories.value.includes('all')) {
      selectedRatingCategories.value = [];
    } else {
      selectedRatingCategories.value = ['all'];
    }
  } else {
    let newSelected = [...selectedRatingCategories.value];

    if (newSelected.includes(categoryId)) {
      newSelected = newSelected.filter(id => id !== categoryId);
    } else {
      if (newSelected.includes('all')) {
        newSelected = newSelected.filter(id => id !== 'all');
      }
      newSelected.push(categoryId);
    }

    selectedRatingCategories.value = newSelected;
  }
}

// Resize handlers
function handleResizeStart(e: MouseEvent): void {
  e.preventDefault();
  isResizing.value = true;
}

// Handle theme toggle
function toggleTheme(): void {
  isDarkMode.value = !isDarkMode.value;
}

// Generate sample chart data
function generateChartData(): ChartDataEntry[] {
  const startDate = parseDate(fromDate.value);
  const endDate = parseDate(toDate.value);
  const data: ChartDataEntry[] = [];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    // Generate random data for each rating category
    const entry: ChartDataEntry = {
      date: formatDate(currentDate),
      heavily_negative: Math.floor(Math.random() * 10),
      mild_negative: Math.floor(Math.random() * 15),
      neutral: Math.floor(Math.random() * 25),
      mild_positive: Math.floor(Math.random() * 20),
      heavily_positive: Math.floor(Math.random() * 15)
    };

    data.push(entry);

    // Move to next date
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

const chartData = ref(generateChartData());

// Simple calendar functionality
function handleCalendarDateSelect(date: string, isFromDate: boolean): void {
  if (isFromDate) {
    fromDate.value = date;
    showFromCalendar.value = false;
  } else {
    toDate.value = date;
    showToCalendar.value = false;
  }
}

// Lifecycle hooks and watchers
onMounted(() => {
  // Try to get saved width from localStorage, default to 256px
  const savedWidth = localStorage.getItem('sidebarWidth');
  if (savedWidth) {
    sidebarWidth.value = parseInt(savedWidth, 10);
  }

  // Try to get saved theme preference from localStorage, default to true (dark mode)
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === 'true';
  }

  // Add event listeners for resize
  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (isResizing.value) {
      const newWidth = moveEvent.clientX;
      // Set min and max constraints
      if (newWidth >= 180 && newWidth <= 500) {
        sidebarWidth.value = newWidth;
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.value = false;
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
});

// Watch for changes to save to localStorage
watch(sidebarWidth, (newWidth) => {
  if (!sidebarCollapsed.value) {
    localStorage.setItem('sidebarWidth', newWidth.toString());
  }
});

watch(isDarkMode, (newValue) => {
  localStorage.setItem('darkMode', newValue.toString());
  // Apply theme class to the document body
  if (newValue) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});
</script>

<template>
  <div :class="[
    'flex h-screen',
    isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    isResizing ? 'cursor-ew-resize select-none' : ''
  ]">
    <!-- Sidebar -->
    <div
      :class="[
        sidebarCollapsed ? 'w-12' : '',
        isResizing ? '' : 'transition-all duration-300',
        'bg-gray-900 text-white shadow-md overflow-y-auto relative'
      ]"
      :style="{ width: sidebarCollapsed ? '3rem' : `${sidebarWidth}px` }"
    >
      <div class="absolute right-0 top-2 p-1">
        <button
          @click="sidebarCollapsed = !sidebarCollapsed"
          class="bg-gray-700 text-white rounded-l-md p-1 hover:bg-primary/40 not-hover:opacity-75"
        >
          <ChevronLeft v-if="!sidebarCollapsed" :size="16" />
          <ChevronRight v-else :size="16" />
        </button>
      </div>

      <!-- Resize handle -->
      <div
        v-if="!sidebarCollapsed"
        class="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/40 z-10 flex items-center justify-center group"
        @mousedown="handleResizeStart"
      >
        <div class="h-full w-px bg-gray-600 group-hover:bg-primary group-hover:w-0.5 transition-all"></div>
      </div>

      <div v-if="!sidebarCollapsed" class="p-4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-xl font-bold">Dashboard Settings</h1>
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-700 transition-colors"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="isDarkMode" :size="18" />
            <Moon v-else :size="18" />
          </button>
        </div>

        <!-- Users Selection -->
        <div class="mb-6">
          <h2 class="text-sm font-semibold mb-2">Users</h2>
          <div class="flex items-center mb-2">
            <div :class="['relative w-full', expandUsers ? 'opacity-50 pointer-events-none' : '']">
              <button
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex justify-between items-center w-full px-3 py-2 text-sm border border-gray-700 rounded-md bg-gray-800 text-white"
                :disabled="expandUsers"
              >
                <span>{{ selectedUsers.includes('all') ? 'All Users' : `${selectedUsers.length} selected` }}</span>
                <ChevronDown :size="16" />
              </button>

              <div v-if="isDropdownOpen && !expandUsers" class="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                <div class="p-2">
                  <label class="flex items-center p-2 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      :checked="selectedUsers.includes('all')"
                      @change="handleUserSelect('all')"
                      class="mr-2"
                    />
                    <span>All</span>
                  </label>

                  <label
                    v-for="user in allUsers"
                    :key="user.id"
                    class="flex items-center p-2 hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      :checked="selectedUsers.includes(user.id)"
                      @change="handleUserSelect(user.id)"
                      class="mr-2"
                    />
                    <span>{{ user.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <label class="flex items-center ml-2">
              <input
                type="checkbox"
                v-model="expandUsers"
                @change="isDropdownOpen = false"
                class="mr-1"
              />
              <span class="text-xs">Expand</span>
            </label>
          </div>

          <div v-if="expandUsers" class="border border-gray-700 rounded-md p-2 mt-2 bg-gray-800">
            <label class="flex items-center p-1 hover:bg-gray-700">
              <input
                type="checkbox"
                :checked="selectedUsers.includes('all')"
                @change="handleUserSelect('all')"
                class="mr-2"
              />
              <span>All</span>
            </label>

            <label
              v-for="user in allUsers"
              :key="user.id"
              class="flex items-center p-1 hover:bg-gray-700"
            >
              <input
                type="checkbox"
                :checked="selectedUsers.includes(user.id)"
                @change="handleUserSelect(user.id)"
                class="mr-2"
              />
              <span>{{ user.name }}</span>
            </label>
          </div>
        </div>

        <!-- Time Period Selection -->
        <div class="mb-6">
          <h2 class="text-sm font-semibold mb-2">Time Period</h2>
          <div class="relative w-full mb-3">
            <button
              @click="isTimeDropdownOpen = !isTimeDropdownOpen"
              class="flex justify-between items-center w-full px-3 py-2 text-sm border border-gray-700 rounded-md bg-gray-800 text-white"
            >
              <span>{{ timePeriods.find(p => p.id === selectedTimePeriod)?.name || 'Select period' }}</span>
              <ChevronDown :size="16" />
            </button>

            <div v-if="isTimeDropdownOpen" class="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
              <div
                v-for="period in timePeriods"
                :key="period.id"
                @click="handleTimePeriodSelect(period.id)"
                class="p-2 hover:bg-gray-700 cursor-pointer text-white"
              >
                {{ period.name }}
              </div>
            </div>
          </div>

          <!-- Date Range Pickers -->
          <div class="flex flex-col space-y-2">
            <div class="relative">
              <label class="text-xs text-gray-400">From:</label>
              <div class="flex items-center">
                <input
                  type="text"
                  v-model="fromDate"
                  class="w-full px-3 py-2 text-sm border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="dd/mm/yyyy"
                />
                <button
                  @click="showFromCalendar = !showFromCalendar"
                  class="absolute right-2 top-6"
                >
                  <Calendar :size="16" />
                </button>
              </div>
              <div v-if="showFromCalendar" class="absolute z-10 bg-gray-800 text-white shadow-lg rounded-md p-2 border border-gray-700 w-64">
                <div class="flex justify-between mb-2">
                  <button @click="() => {}" class="px-2">←</button>
                  <div>Calendar</div>
                  <button @click="() => {}" class="px-2">→</button>
                </div>
                <div class="text-center">
                  <button @click="showFromCalendar = false" class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div class="relative">
              <label class="text-xs text-gray-400">To:</label>
              <div class="flex items-center">
                <input
                  type="text"
                  v-model="toDate"
                  class="w-full px-3 py-2 text-sm border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="dd/mm/yyyy"
                />
                <button
                  @click="showToCalendar = !showToCalendar"
                  class="absolute right-2 top-6"
                >
                  <Calendar :size="16" />
                </button>
              </div>
              <div v-if="showToCalendar" class="absolute z-10 bg-gray-800 text-white shadow-lg rounded-md p-2 border border-gray-700 w-64">
                <div class="flex justify-between mb-2">
                  <button @click="() => {}" class="px-2">←</button>
                  <div>Calendar</div>
                  <button @click="() => {}" class="px-2">→</button>
                </div>
                <div class="text-center">
                  <button @click="showToCalendar = false" class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratings Selection -->
        <div class="mb-6">
          <h2 class="text-sm font-semibold mb-2">Rating Categories</h2>
          <div class="border border-gray-700 rounded-md p-2 bg-gray-800">
            <label
              v-for="category in ratingCategories"
              :key="category.id"
              class="flex items-center p-1 hover:bg-gray-700"
            >
              <input
                type="checkbox"
                :checked="selectedRatingCategories.includes(category.id)"
                @change="handleRatingCategorySelect(category.id)"
                class="mr-2"
              />
              <span class="text-sm">{{ category.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Area -->
    <div :class="['flex-1 overflow-y-auto', isDarkMode ? 'text-gray-200' : '']">
      <!-- Top panel - Selection Criteria Summary -->
      <div :class="[isDarkMode ? 'bg-gray-800' : 'bg-white', 'p-4 shadow mb-4']">
        <h1 class="text-xl font-bold mb-3">Chatbot Ratings Dashboard</h1>
        <div class="grid grid-cols-3 gap-4">
          <div :class="['border rounded p-2', isDarkMode ? 'border-gray-700' : '']">
            <h3 class="text-sm font-semibold mb-1">Users</h3>
            <p class="text-sm">
              {{ selectedUsers.includes('all') ? 'All Users' : `${selectedUsers.length} selected` }}
            </p>
          </div>
          <div :class="['border rounded p-2', isDarkMode ? 'border-gray-700' : '']">
            <h3 class="text-sm font-semibold mb-1">Time Period</h3>
            <p class="text-sm">{{ fromDate }} - {{ toDate }}</p>
          </div>
          <div :class="['border rounded p-2', isDarkMode ? 'border-gray-700' : '']">
            <h3 class="text-sm font-semibold mb-1">Rating Categories</h3>
            <p class="text-sm">
              {{ selectedRatingCategories.includes('all') ? 'All Ratings' :
                selectedRatingCategories.map(id =>
                  ratingCategories.find(cat => cat.id === id)?.name
                ).filter(Boolean).join(', ') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bar Chart Panel -->
      <div :class="[isDarkMode ? 'bg-gray-800' : 'bg-white', 'p-4 shadow mb-4']">
        <h2 class="text-lg font-semibold mb-3 text-primary">Ratings Distribution Over Time</h2>
        <div class="h-64">
          <!-- Chart would go here - using a placeholder for now -->
          <div class="w-full h-full flex items-center justify-center bg-gray-700 rounded">
            <p>Chart Placeholder - Recharts would be integrated here</p>
          </div>
        </div>
      </div>

      <!-- Rating Summary -->
      <div :class="[isDarkMode ? 'bg-gray-800' : 'bg-white', 'p-4 shadow mb-4']">
        <h2 class="text-lg font-semibold mb-3 text-secondary">Rating Summary</h2>
        <div class="grid grid-cols-5 gap-4 text-center">
          <div :class="[isDarkMode ? 'bg-red-900/30' : 'bg-red-100', 'p-3 rounded']">
            <div :class="['text-xl font-bold', isDarkMode ? 'text-red-400' : 'text-red-600']">
              {{ chartData.reduce((sum, item) => sum + item.heavily_negative, 0) }}
            </div>
            <div class="text-sm">Heavily Negative</div>
          </div>
          <div :class="[isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100', 'p-3 rounded']">
            <div :class="['text-xl font-bold', isDarkMode ? 'text-orange-400' : 'text-orange-600']">
              {{ chartData.reduce((sum, item) => sum + item.mild_negative, 0) }}
            </div>
            <div class="text-sm">Mild Negative</div>
          </div>
          <div :class="[isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100', 'p-3 rounded']">
            <div :class="['text-xl font-bold', isDarkMode ? 'text-gray-300' : 'text-gray-600']">
              {{ chartData.reduce((sum, item) => sum + item.neutral, 0) }}
            </div>
            <div class="text-sm">Neutral</div>
          </div>
          <div :class="[isDarkMode ? 'bg-green-900/30' : 'bg-green-100', 'p-3 rounded']">
            <div :class="['text-xl font-bold', isDarkMode ? 'text-green-400' : 'text-green-600']">
              {{ chartData.reduce((sum, item) => sum + item.mild_positive, 0) }}
            </div>
            <div class="text-sm">Mild Positive</div>
          </div>
          <div :class="[isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100', 'p-3 rounded']">
            <div :class="['text-xl font-bold', isDarkMode ? 'text-emerald-400' : 'text-emerald-600']">
              {{ chartData.reduce((sum, item) => sum + item.heavily_positive, 0) }}
            </div>
            <div class="text-sm">Heavily Positive</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles can go here */
</style>
