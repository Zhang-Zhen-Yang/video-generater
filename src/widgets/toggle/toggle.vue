<template>
    <div class="toggle">    
        <span class="text-middle"><slot></slot></span>
        <label>
            <input type="checkbox" class="hide" :checked="value" @change="ontoggle">
            <div class="toggle-container">
                <div class="toggle-circle"></div>  
            </div>
        </label>   
        
    </div>
</template>

<script>

export default {
    name: 'toggle',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        toggleVal: {
            type: Boolean,
            default () {
                return false;
            }
        }
    },
    data () {
        return {
            toggle: false
        };
    }, // end data
    computed: {

    }, // end computed
    methods: {
        ontoggle () {
            // this.$emit('toggle', !this.toggleVal);
            this.$emit('input', !this.value);
        }
    } // end methods
};
</script>

<style>
    .toggle{
        display:inline-block;
        height:20px;
        /*padding-right:35px;*/
        
        line-height:20px;
        position:relative;
        vertical-align:middle;
        
    }
    .toggle label{
        display:inline-block;
        height:20px;
        width:35px;
        position:relative;
        top:0;
        cursor:pointer;
        vertical-align:middle;
    }
    .toggle-container{
        width:34px;
        height:14px;
        /*border:1px solid #efefef;*/
        /*background-color:#efefef;*/
        background-color:rgba(0,0,0,.38);

        position:absolute;
        right:0;
        top:3px;
        border-radius:8px;
        display:inline-block;
        transition:all 0.2s ease-out;
        
    }
    .toggle-circle{
        width:20px;
        height:20px;
        /*border:2px solid #aaa;*/
        border-radius:50%;
        background-color:#FFFFFF;
        position:absolute;
        top:-3px;
        left:0;
        transition:all 0.2s ease-out;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
    }
    .toggle input:checked+.toggle-container{
        /*background-color:#0b9c59*/
        background-color:rgba(255,193,7,.5);
    }
    .toggle input:checked+.toggle-container>.toggle-circle{
        background:red;
        left:14px;
        /*background-color:#42b983;*/
        background-color:#ffc107;
        
        border:0px solid #42b983;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
    }
    .toggle input{
        display: none;
    }

</style>