import sliderboxparent from './sliderboxparent';
import sliderbox from './sliderbox';

export default{
	install (Vue) {
		Vue.component('sliderbox-wrapper',sliderboxparent);
		Vue.component('sliderbox-item',sliderbox);
  	}
}