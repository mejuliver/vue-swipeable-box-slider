<template>
  <div class="sliderbox-item">
    <div class="sliderbox-item-wrapper">
		<slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
	.sliderbox-item {
		width: 80%;
		width: calc(80%/var(--n));
		user-select: none;
		pointer-events: none;
		position:relative;
		padding: 15px;
		border-radius: 12px;
		opacity: .5;
		transition: transform .2s ease-out;
		transform: scale(1);
		&.active{
			opacity:1!important;
			transform: scale(1.1);
			z-index: 100;
		}
		.sliderbox-content{
			padding: 16px;
		}
		img{
			max-width: 100%;
			max-height: 100%;
			display:block;
			border-radius: 12px;
			margin-bottom: 8px;
		}
		.sliderbox-item-wrapper{
			background: #FFF;
			border-radius: 12px;
			box-shadow:0 10px 40px -6px rgba(0,0,0,.1);			
		}
	}
</style>

<script>
  export default {

  }
</script>