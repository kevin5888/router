import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import './common/style/index.css';//引入样式，不用渲染直接用就可以，所以不用起名字
import './common/style/base.css';

import Item from './component/Item';//引入component下的文件，因为下面要渲染所以要起名字
import Footer from './component/footer';
// import todosData from './common/data/todosData';
// App类组件
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			inputVal:'',
			todosData:[],
			view:'all',//新建变量，为了页面下面的点击使用，根据view的值不同来显示不同的数据
		};
		// 绑定
		this.inputChange = this.inputChange.bind(this);
		this.inputOnEnter = this.inputOnEnter.bind(this);
		this.todoOnChange = this.todoOnChange.bind(this);
		this.deletetodo = this.deletetodo.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.changeView = this.changeView.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
	}

	inputChange(ev){
		// ev.preventDefault();
		// ev.stopPropagation();
		this.setState({
			inputVal:ev.target.value
		});
	}
	
	// 回车
	inputOnEnter(ev){
		// console.log(ev.keyCode);
		if(ev.keyCode!==13) return;//判断如果不是回车就返回
		let {value} = ev.target;
		let {todosData} = this.state;
		if(!value.trim()) return;//当是空格的时候return
		this.setState({//更新todosData的数据
			todosData:[
				...todosData,//展开之前的数组
				{//把数据放到数组里
					id:Math.random(),
					content:value,
					isActive:true
				}
			],
			inputVal:''
		});
	}
	todoOnChange(id){
		let {todosData} = this.state;
		
		let newTodos = todosData.map((todo,indx)=>{
			if(todo.id===id){
				todo.isActive = !todo.isActive;
			}
			return todo;
		});
		this.setState({
			todosData:newTodos
		})
	}
	// 删除todo
	deletetodo(id){
		let {todosData} = this.state;
		// filter过滤数据（告诉点击的是哪一个删除的是哪个）
		let newTodos = todosData.filter((todo,indx)=>{
			//每一个Id都看一下，
			return todo.id === id ? false : true 
		});
		this.setState({
			todosData:newTodos//得到一个新数组，叫newTodos
		})
	}
	// 全选
	toggleAll(ev){
		let {checked} = ev.target;
		let {todosData} = this.state;
		this.setState({
			todosData:todosData.map(elt =>{
				elt.isActive = !checked;
				return elt;
			})
		})
	}
	// 切换显示不同状态的 todo
    changeView(view){
        this.setState({
            view
        })
	}
	
	// 清除已完成
    clearCompleted(){
        let {todosData} = this.state;
        // filter 回调函数返回 ture, 元素会被保留
        let newTodos = todosData.filter( (todo, indx)=>{
            return todo.isActive ? true : false
        } );

        this.setState({
            todosData: newTodos
        })
    }

    render(){
		let {inputVal,todosData,view} = this.state;
		let {
			inputChange,
			inputOnEnter,
			todoOnChange,
			deletetodo,
			toggleAll,
			changeView,
			clearCompleted
		} = this;
		// 所有长度
		let todosLength = todosData.length;
		let leftCount = todosLength;//假设有多少个没有被勾选（假设全部没有被勾选）
		// 过滤什么todo会被显示，切换不同的视图
		let filteredTodosData = todosData.filter( (elt, indx, arr)=>{
		let {id,content,isActive} = elt;
		let shouldStay = false;//新建一个变量假设点击一开始为false
		if(!isActive) leftCount--;//如果isactive为true时候，如果被勾选，剩余的值减减
			switch(view){
				// 如果是点击active
				case "active":
					if(isActive===true){
						shouldStay = true;
					}
					break;
				// 如果value为completed
				case "completed":
					if(isActive===false){
						shouldStay = true;
					}
					break;
				default:
					shouldStay = true;
			}
			return shouldStay;
		});
		let todosComponent = filteredTodosData.map(({id,isActive, content})=>{
			return (
				<Item
					key={id}//一个属性
					{...{
						id,
						content,
						isActive,
						todoOnChange,
						deletetodo
					}}
				/>
			);
		});
		// console.log(todosComponent);
        return (
                <div>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							autoFocus={true}
							value={inputVal}
							onChange={inputChange}
							onKeyDown={inputOnEnter}
						/>
					</header>
					{todosLength>0 ? (
						<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
							onChange={toggleAll}
							checked={ leftCount===0 }//控制全选
						/>
						<ul className="todo-list">
                            {todosComponent}
						</ul>
					</section>
					) : null }
					{todosLength>0 ?(
						<Footer
						// jsx提供的一种语法
							{...{
								changeView,
								view,
								leftCount,
								clearCompleted: clearCompleted,
								// 只要有一个被勾选，就显示也就是true
								// 所有的todo的长度和剩余没有被勾选的todo的长度比较，只有剩余的长度小于全部todo的长度就说明有人被勾选
								showClearButton: todosLength > leftCount
							}}
						/>
					):null}
			</div>
        )
	}
}
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);