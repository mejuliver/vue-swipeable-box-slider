<template>
	<div :class="classes" :id="sliderid" :ref="sliderid">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.sliderbox-container {
		--n: 1;
		overflow-x: hidden!important;
		display: flex;
		align-items: center;
		overflow-y: hidden !important;
		width: 100%;
		width: calc(var(--n)*100%);
		max-height: 100vh;
		transform: translate(calc(var(--tx, 0px) + var(--i, 0)/var(--n)*-90%));
		transition: transform .3s ease-out;
	}
	
</style>

<script>
	export default{
		props : ['sliderclass','csliderid'],
		data(){
			return {
				sliderid : ( this.csliderid ) ? this.csliderid : 'sliderbox_'+this.uniqsliderid(5),
				N : 0,
				w : window.innerWidth,
				i : 0,
		    	x0 : null,
		    	locked : false,
		    	classes : [ 'sliderbox-container', ( this.sliderclass ) ? this.sliderclass : '' ]
			}
		},
		methods : {
			uniqsliderid(length){
				let result = '';
			   	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			   	let charactersLength = characters.length;
			   	for ( var i = 0; i < length; i++ ) {
			      result += characters.charAt(Math.floor(Math.random() * charactersLength));
			   	}
			   	return result;
			},
			unify(e){
				return e.changedTouches ? e.changedTouches[0] : e
			},
			lock(e){
				this.x0 = this.unify(e).clientX;
				this.$refs[this.sliderid].classList.toggle('smooth', !(this.locked = true))
			},
			drag(e){
				e.preventDefault();
				if(this.locked){
					this.$refs[this.sliderid].style.setProperty('--tx', `${Math.round(this.unify(e).clientX - this.x0)}px`);
				}
			},
			move(e){
				const _self = this;

				if(this.locked) {
				    let dx = this.unify(e).clientX - this.x0,
				    	s = Math.sign(dx), 
						f = +(s*dx/this.w).toFixed(2);

				    if((this.i > 0 || s < 0) && ( this.i < this.N - 1 || s > 0) && f > .2) {
						this.$refs[this.sliderid].style.setProperty('--i', this.i -= s);
						f = 1 - f;
					}
						
				    this.$refs[this.sliderid].style.setProperty('--tx', '0px');
					this.$refs[this.sliderid].style.setProperty('--f', f);
				    this.$refs[this.sliderid].classList.toggle('smooth', !(this.locked = false));
				    this.x0 = null;

				    if( this.$refs[this.sliderid].querySelector('.sliderbox-item.active') ){
				    	this.$refs[this.sliderid].querySelector('.sliderbox-item.active').classList.remove('active');
				    }
				    
				    setTimeout(function(){
				    	let minactive = [];

				    	_self.$refs[_self.sliderid].querySelectorAll('.sliderbox-item').forEach(function(el,i){
				    		minactive.push(Math.abs(el.getBoundingClientRect().left));
					    });

				    	let min = Math.min(...minactive);
				    	let minq = minactive.indexOf(min);

					    _self.$refs[_self.sliderid].querySelectorAll('.sliderbox-item')[minq].classList.add('active');
				    },600);
			  	}
			},
			init(){
				const _self = this;

				this.$refs[this.sliderid].querySelector('.sliderbox-item').classList.add('active');
				this.$refs[this.sliderid].style.height = parseInt(this.$refs[this.sliderid].querySelector('.sliderbox-item').getBoundingClientRect().height)+150+'px';

				
				this.$refs[this.sliderid].style.setProperty('--n', this.N);

				addEventListener('resize', function(){
					_self.w = window.innerWidth;
				}, false);

				this.$refs[this.sliderid].addEventListener('mousedown', this.lock, false);
				this.$refs[this.sliderid].addEventListener('touchstart', this.lock, false);

				this.$refs[this.sliderid].addEventListener('mousemove', this.drag, false);
				this.$refs[this.sliderid].addEventListener('touchmove', this.drag, false);

				this.$refs[this.sliderid].addEventListener('mouseup', this.move, false);
				this.$refs[this.sliderid].addEventListener('touchend', this.move, false);
			},

		},
		mounted(){
			
			this.w = window.innerWidth;
			this.N = this.$refs[this.sliderid].children.length
			this.init();
		}
	}
</script>