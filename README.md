# vue-swipeable-box-slider
Swipeable boxs slider Vuejs

## to install via npm

*npm i vue-swipeable-box-slider*

## use via cli
```
import sliderbox from 'vue-swipeable-box-slider';

Vue.use(sliderbox);
```

## plugin components
```
<sliderbox-wrapper :csliderid="<your custom id>" :sliderclass="<your custom slider class>">
	<sliderbox-item v-for="item in slideritems" :key="item.id"></sliderbox-item>
</sliderbox-wrapper>
```

**props**

csliderid = if provided, will be use instead, else a random id will be created

sliderclass = custom classes for your slider





