class NegociacaoController {

    constructor(){
        let self = this;
        let $ = document.querySelector.bind(document);
    
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adicionar', 'esvazia'
        );

        //this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        );

        //this._mensagemView.update(this._mensagem);      
    }

    adiciona(event){

        event.preventDefault();

            this._listaNegociacoes.adicionar(this._criaNegociacao());
            this._mensagem.texto = "Negociação adicionada com sucesso!";    
            this._limpaFormulario();
            console.log(this._listaNegociacoes.negociacoes);    
        }
        
        importaNegociacoes(){
         
            let service = new NegociacaoService();
            service
            .obterNegociacoes()
            .then(negociacoes => {
              negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
              this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);  
        }

        apaga(){

            this._listaNegociacoes.esvazia();
            this._mensagem.texto = "Negociações apagadas com sucesso!";

        }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}