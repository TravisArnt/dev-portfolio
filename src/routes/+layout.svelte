<script>
    import "../app.css"
    import {Header,Footer} from '$components'
    let {children} = $props()

</script>
<Header/>
{@render children()}
<Footer/>
