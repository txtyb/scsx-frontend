<script setup lang="ts">
import { defineComponent, h } from 'vue';

import { GChart } from 'vue-google-charts';

const type = 'LineChart';

const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
];

const options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 800,
    height: 600,
};

const chart = h(GChart, {
    data,
    options,
    type,
});

</script>

<template>
<chart/>
</template>