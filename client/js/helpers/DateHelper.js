class DateHelper {

    constructor(){
        throw new Error('Não é possível instanciar uma classe estática (Static)');
    }


    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
        
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('O formato é yyyy-mmmm-dddd');
        
        return new Date(...texto.split('-').map( (item, indice) =>  item - indice % 2 ));
    }

   
}