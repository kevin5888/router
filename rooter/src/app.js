import{
	BrowserRouter as Router,
	Route
}from 'react-router-dom';

import Nav from './component/Nav'
import Home from "./Container/home/Home.js"
import Movie from './Container/movie/Movie'
import Teleplay from './Container/teleplay/Teleplay'

// console.log(Nav)

class App  extends Component{
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		view:'home'
	// 	};
	// 	[this.changeView].forEach(fn=>this[fn.name] = fn.bind(this));
	// }
	// changeView(view){
	// 	console.log(view, 'd')
	// 	this.setState({
	// 		view
	// 	})
	// }
	render(){
	// 	let {view} = this.state;
	// 	let {changeView} = this;
	// 	let viewComp = null;
	// 	switch(view){
	// 		case 'Movie':
	// 			viewComp = <Movie/>
	// 			break;
	// 		case 'Teleplay':
	// 			viewComp = <Teleplay/>
	// 			break;
	// 		default:
	// 			viewComp = <Home/>

	// 	}
	// 	console.log(view)
	let {history,location,match} = this.props;
		return(
			// <div>
			// 	<Nav
			// 		{
			// 			...{
			// 				changeView
			// 			}
			// 		}
			// 	/>
			// 	{viewComp}
			// </div>
			<div>
				<Nav history={history} />
				<Route exact path='/' component={Home}/>
				<Route path='/teleplay' component={Teleplay}/>
				<Route path='/movie' component={Movie}/>
			</div>
		)
	}
}
ReactDOM.render(
	<Router>
		<Route path='/' component={App} />
	</Router>,
	document.getElementById('root')
);