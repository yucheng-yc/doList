import React from "react";
import { PageHeader,Input,Empty,List,Button,message,Popconfirm,Modal} from 'antd';
const { Search } = Input;
export default class AddList extends React.Component {
    // 定义转态数据 dataSource数据来源
    state={listArr:["吃饭饭","睡觉觉","打豆豆"],visible:false,lsValue:'',i:-1}
    // 添加代办事项 点击搜索或按下回车键时的回调
    addList=(va:string)=>{
        if(va!==''){
            var listArr:any=this.state.listArr;
            listArr.push(va);
            this.setState({
                listArr
            },()=>{
                message.success('添加成功');
            })
        }
    }
    // 编辑指定项 内容
    edit(e:any,i:number){

       this.setState({
        visible:!this.state.visible,
        lsValue:this.state.listArr[i],
        i
       })
         
    }
    // 删除指定项 内容
    del(e:any,i:number){
        this.setState({
            i
        })
    }
    // 删除按钮 删除指定项内容 当确认时 
    confirm=()=>{
        var i=this.state.i;
        var listArr=this.state.listArr;
        listArr.splice(i,1);
        this.setState({
            listArr
        })
    }
    // 编辑 取消按钮
    Cancel=()=>{
        this.setState({
            visible:!this.state.visible,
            lsValue:''
        })
    }
    // 编辑 确认按钮
    ok(e:any,i:number){
         console.log(i);
        var listArr:any=this.state.listArr;
        listArr[i]=this.state.lsValue
        this.setState({
            listArr
        },()=>{
            this.setState({
                visible:!this.state.visible,
            })
        })
    }
    // 当 用户 编辑 修改时
    edIpt(e:any){  
        this.setState({
            lsValue:e.target.value
        })
    }
    // 绑定搜索内容
    render(){
        // 获取状态数据 进行解构
        const {listArr} =this.state;
        return (
            <div>
                {/* 页头部分 */}
                <PageHeader style={{border: '1px solid rgb(235, 237, 240)'}}  title="代办事项"/>
                <Search
                    placeholder="输入代办事项"
                    enterButton="添加"
                    onSearch={this.addList}
                    allowClear={true}
                    />
                {/* 模拟if结构 */}
                {
                    (()=>{
                        if(listArr.length>0){
                            return (
                                <div>
                                    <List
                                    size="small"
                                    header={<div>代办内容</div>}
                                    bordered
                                    dataSource={listArr}
                                    renderItem={
                                        (item,i) => 
                                        <List.Item 
                                        actions={[
                                        <div>
                                            <Button size="small" onClick={(e)=>{this.edit(e,i)}}>编辑</Button>
                                        </div>,
                                        <Popconfirm placement="topRight" title={"确然删除吗"} onConfirm={this.confirm} okText="确认删除" cancelText="取消"><Button size="small" onClick={(e)=>{this.del(e,i)}} >删除</Button></Popconfirm>]}
                                        >
                                            {item}
                                        </List.Item>
                                    }
                                />
                                <Modal title="编辑" okText="确认" cancelText="取消" onCancel={this.Cancel} onOk={(e)=>this.ok(e,this.state.i)} visible={this.state.visible}>
                                    <Input value={this.state.lsValue} onChange={(e)=>this.edIpt(e)}/>
                                </Modal>
                          </div>
                            )
                        }else{
                            return <Empty />
                        }
                    })()
                }
            </div>
        )
    }
    // 生命周期内 数据存储操作
    componentDidUpdate(){
        sessionStorage.setItem("listArr",JSON.stringify(this.state.listArr));
    }
    UNSAFE_componentWillMount(){
        if(sessionStorage.getItem('listArr')!==null){
            let str:any=sessionStorage.getItem('listArr')
            var listArr=JSON.parse(str)
            this.setState({
                listArr
            })
        }
    }
}