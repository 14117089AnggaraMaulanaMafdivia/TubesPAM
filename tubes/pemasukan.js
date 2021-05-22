import { navigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { style } from './Style'


class pemasukan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uang:'',
            keterangan:'',
            listData:[],
            id_pemasukanEdit:null,
        };
        this.url = "http://192.168.43.217/api/api2.php"
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
            if(this.state.id_pemasukanEdit){
              var urlAksi = this.url+"/?op=update&id_pemasukan="+this.state.id_pemasukanEdit;
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
    async klikEdit(id_pemasukan){
        await fetch(this.url+"/?op=detail&id_pemasukan="+id_pemasukan)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({uang:json.data.result[0].uang});
            this.setState({keterangan:json.data.result[0].keterangan})
            this.setState({id_pemasukanEdit:id_pemasukan})
        })
      }
      async klikDelete(id_pemasukan){
        await fetch(this.url+"/?op=delete&id_pemasukan="+id_pemasukan)
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
                
                <Text style={style.textInfo}>PEMASUKAN</Text>
                <View style={style.viewData}>
                    {
                        this.state.listData.map((val,index)=>(
                            <View style={style.viewList} key=
                            {index}>
                               <Text style={style.textListUang}
                               >{val.uang}</Text>
                               <Text style={style.textListUang}>{val.keterangan}</Text>
                               <Text style={style.textListUang}>{val.tgl}</Text> 
                               <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id_pemasukan)}>edit</Text>
                               <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id_pemasukan)}>Delete</Text>
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

export default pemasukan

