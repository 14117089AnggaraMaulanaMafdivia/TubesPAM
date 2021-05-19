import React, { Component } from 'react'
import { Text, TextInput, View, Button, ScrollView } from 'react-native'
import { style } from './Style'



class Depan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uang:'',
            keterangan:'',
            listData:[],
            idEdit:null,
        };
        this.url = "http://192.168.43.217/api/api.php"
    }
    componentDidMount(){
       this.ambilListData()
    }
    async ambilListData(){
        await fetch(this.url)
        .then((response)=>response.json())
        .then((json)=>{
            console.log('hasil yang didapat: '+JSON.stringify(json.data.result));
            this.setState({listData:json.data.result});
        })
        .catch((error)=>{
           console.log(error); 
        })
    }
    klikSimpan(){
        if(this.state.uang == '' || this.state.keterangan == ''){
          alert('Silakan masukkan uang dan keterangan');
        }else{
            if(this.state.idEdit){
              var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
            }else{
              var urlAksi = this.url+"/?op=create";
            }
            
  
            fetch(urlAksi,{
                method:'post',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:"uang="+this.state.uang+"&keterangan="+this.state.keterangan
            })
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({uang:''});
                this.setState({keterangan:''});
                this.ambilListData();
            })
        }
    }
    async klikEdit(id){
        await fetch(this.url+"/?op=detail&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({uang:json.data.result[0].uang});
            this.setState({keterangan:json.data.result[0].keterangan})
            this.setState({idEdit:id})
        })
      }
      async klikDelete(id){
        await fetch(this.url+"/?op=delete&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            alert('Data berhasil didelete');
            this.ambilListData();
        })
        .catch((error)=>{
            console.log(error)
        })
      }
    render() {
        return (
            
            <View style={style.viewWrapper}>
                <View style={style.viewData}>
                    {
                        this.state.listData.map((val,index)=>(
                            <View style={style.viewList} key=
                            {index}>
                               <Text style={style.textListUang}
                               >{val.uang}</Text>
                               <Text style={style.textListUang}>{val.keterangan}</Text>
                               <Text style={style.textListUang}>{val.tgl_input}</Text> 
                               <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>edit</Text>
                               <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                            </View>
                        ))
                    }
                </View>

                
                <View style={style.viewForm}>
                    <TextInput
                        style={style.textInput}
                        placeholder="masukkan jumlah uang"
                        value={this.state.uang}
                        onChangeText={(text)=>this.setState({uang:text})}

                        >
                    </TextInput>
                    <TextInput
                        style={style.textInput}
                        placeholder="keterangan"
                        value={this.state.keterangan}
                        onChangeText={(text)=>this.setState({keterangan:text})}
                    ></TextInput>
                    <Button 
                    title="masukkan data"
                    onPress={()=>this.klikSimpan()}>

                    </Button>
                </View>
            </View>
            
        )
    }
}

export default Depan
