<template>
    <div :class="[bem.b()]">
        <t-input :class="[bem.e('input')]" :modelValue="formattedValue" :placeholder="props.placeholder"
            :disabled="props.disabled" :readonly="props.readonly"
            :suffixIcon="props.clearable && !props.disabled ? 'lzw-icon-close' : ''" @click="handleClick"
            @click:suffixIcon.stop="handleClear" ref="referenceEl" />

        <t-popup v-model="showPicker" trigger="manual" placement="bottom-start"
            :reference="referenceEl?.value?.$el ?? null">
            <template #popper>
                <div :class="bem.e('panel')">
                    <!-- 这里放置之前的内容 -->
                    <div :class="bem.e('header')">
                        <button @click="prevMonth">←</button>
                        <span>{{ currentDate.format('YYYY年MM月') }}</span>
                        <button @click="nextMonth">→</button>
                    </div>
                    <div :class="bem.e('body')">
                        <div :class="bem.e('weekdays')">
                            <span v-for="day in weekdays" :key="day">{{ day }}</span>
                        </div>
                        <div :class="bem.e('dates')">
                            <span v-for="date in dates" :key="generateKey(date.date)" :class="[
                                bem.e('date'),
                                [bem.is('today', isToday(date.date))],
                                [bem.is('selected', isSelected(date.date))],
                                [bem.is('disabled', isDisabledDate(date.date))]
                            ]" @click="selectDate(date.date)">
                                {{ date.day }}
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </t-popup>
    </div>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { computed, ref, watch } from 'vue';
import { bem, datePickerProps } from './date-picker';

const props = defineProps(datePickerProps);
const emit = defineEmits(['update:modelValue', 'change']);

// 当前显示的日期
const currentDate = ref<Dayjs>(props.modelValue ? dayjs(props.modelValue) : dayjs());
// 是否显示选择器面板
const showPicker = ref(false);
// 格式化显示的值
const formattedValue = computed(() => {
    if (!props.modelValue) return '';
    try {
        // 处理不同类型的modelValue
        let date: Dayjs;
        if (props.modelValue instanceof Date) {
            date = dayjs(props.modelValue);
        } else if (typeof props.modelValue === 'string') {
            date = dayjs(props.modelValue);
        } else if (typeof props.modelValue === 'number') {
            date = dayjs(props.modelValue);
        } else {
            return '';
        }
        return date.format(props.format);
    } catch (e) {
        console.error('日期格式化失败', e);
        return '';
    }
});

// 引用输入框元素
const referenceEl = ref<{ value: { $el: HTMLElement } } | null>(null);
const isClickInside = ref(false);

// 处理点击输入框
const handleClick = (event: Event) => {
    event.stopPropagation(); // 阻止事件冒泡
    if (props.disabled || props.readonly) return; // 同时判断 disabled 和 readonly
    isClickInside.value = true;
    showPicker.value = true;
};



// 处理清空
const handleClear = () => {
    if (props.disabled) return;
    emit('update:modelValue', undefined);
    emit('change', undefined);
};

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        currentDate.value = dayjs(newVal);
    }
});

// 获取当前月份的所有日期
const dates = computed(() => {
    const daysInMonth = currentDate.value.daysInMonth();
    const firstDay = currentDate.value.startOf('month').day();
    const datesArray = [];

    // 添加上个月的天数
    for (let i = 0; i < firstDay; i++) {
        const prevMonthDate = currentDate.value.subtract(1, 'month').endOf('month').subtract(firstDay - i - 1, 'day');
        datesArray.push({
            day: prevMonthDate.date(),
            date: prevMonthDate
        });
    }

    // 添加本月的天数
    for (let i = 1; i <= daysInMonth; i++) {
        const currentMonthDate = currentDate.value.date(i);
        datesArray.push({
            day: i,
            date: currentMonthDate
        });
    }

    // 计算需要显示的下个月天数（保持6行）
    const totalDays = datesArray.length;
    const nextDays = totalDays > 35 ? 42 - totalDays : 35 - totalDays;

    // 添加下个月的天数
    for (let i = 1; i <= nextDays; i++) {
        const nextMonthDate = currentDate.value.add(1, 'month').date(i);
        datesArray.push({
            day: i,
            date: nextMonthDate
        });
    }

    return datesArray;
});

// 获取星期名称
const weekdays = computed(() => {
    const startDay = 1; // 周一作为一周的第一天
    const weekdaysArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return [...weekdaysArray.slice(startDay), ...weekdaysArray.slice(0, startDay)];
});

// 判断是否是今天
const isToday = (date: Dayjs) => {
    try {
        return date.isSame(dayjs(), 'day');
    } catch (e) {
        console.error('判断是否为今天失败', e);
        return false;
    }
};

// 判断是否是选中的日期
const isSelected = (date: Dayjs) => {
    if (!props.modelValue) return false;
    try {
        const selectedDate = dayjs(props.modelValue);
        return date.isSame(selectedDate, 'day');
    } catch (e) {
        console.error('判断是否为选中日期失败', e);
        return false;
    }
};

// 判断日期是否禁用
const isDisabledDate = (date: Dayjs) => {
    // TODO: 实现具体的禁用日期逻辑
    return false;
};

// 生成唯一 key
const generateKey = (date: Dayjs): string => {
    return date.toISOString();
};

// 选择日期
const selectDate = (date: Dayjs) => {
    if (isDisabledDate(date)) return;

    try {
        emit('update:modelValue', date.toDate());
        emit('change', date.toDate());
        showPicker.value = false;
    } catch (e) {
        console.error('选择日期失败', e);
    }
};

// 上一个月
const prevMonth = () => {
    try {
        currentDate.value = currentDate.value.subtract(1, 'month');
    } catch (e) {
        console.error('切换到上个月失败', e);
    }
};

// 下一个月
const nextMonth = () => {
    try {
        currentDate.value = currentDate.value.add(1, 'month');
    } catch (e) {
        console.error('切换到下个月失败', e);
    }
};

</script>
