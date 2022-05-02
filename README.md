# Interface Sirius - Hackatona

<p style="text-align: justify">
    A interface Sirius tem por objetivo integrar sistemas de informação de saúde brasileiros (ex: ESUS, GAL, SINAN) e também fluxos de trabalhos existentes como do CIEVS com o <a href="https://www.who.int/tools/godata" target="_blank">Go.Data</a> no qual é um software da OMS (Organização Mundial da Saúde) para coleta de dados de emergências de saúde pública tendo o seu principal objetivo na investigação de surto e a visualização das cadeias de transmissão.
</p>

## Objetivos específicos 

* Permitir a integração de dados entre a Vigilância em Saúde e Atenção Primária em Saúde.
* Apoiar as unidades básicas de saúde do Distrito Federal no aprimoramento e na qualificação do seguimento de casos de Covid-19;
* Contribuir na elaboração de um fluxo padronizado para o acompanhamento de casos para as Regiões de Saúde do Distrito Federal 

## Tecnologias utilizadas 
<img src="https://user-images.githubusercontent.com/12243763/40760176-7f92ceb8-6463-11e8-9c4b-f65907c613ae.png" width="350" height="150">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png" width="150" height="150">

<img src="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png" width="300" height="150">

## Instalação local
### 1. Instale os pré-requisitos
* NodeJS (v14.18.0 ou superior)
* Yarn
* Concurrently  
`npm install --global concurrently`

### 2. Clone o projeto
`git clone https://github.com/sdsunb/sds-integracoes-hackatona.git`

### 3. Instale as dependências
`cd sds-integracoes-hackatona` para entrar no diretório e então:  
`yarn`

### 4. Configure o ambiente
Há um arquivo `.env.example` em cada parte do projeto (Frontend e Backend). Inicie criando um arquivo `.env` com as variáveis locais. Para fins de teste, utilize as seguintes configurações para o `.env` do Backend:

```
API_ADDRESS=https://inclusaodigital.unb.br/api
OUTBREAK_ID=f7b6bd48-1bd7-45bd-9872-0171aea1a251
ESUS_OUTBREAK_ID=c65422ab-ae0b-48de-aa9c-af939d381ea8
PARENT_LOCATION_ID=bc287cb6-729c-4693-a2aa-a4c14f239630
```
E as seguintes configurações para o `.env` do Frontend:
```
REACT_APP_API_URL="http://localhost:3333"
REACT_APP_GODATA_URL="https://inclusaodigital.unb.br"
REACT_APP_RESPONSIBLE=Seu nome
REACT_APP_RESPONSIBLE_EMAIL=seu@email.com
```

As informações detalhadas de cada `.env` se encontram na Wiki do repositório.

### Rode o projeto
`cd backend`  
`yarn start`

Acesse o localhost:3000 no seu navegador.  
Por padrão, o Frontend roda na porta `3000` e o Backend na porta `3333`.

## Documentação
A documentação do projeto pode ser acessada na <a href="https://github.com/sdsunb/sds-integracoes-hackatona/wiki" target="_blank">Wiki</a> deste repositório e logo logo estará disponível em nosso site em construção :)

## Guia de contribuição
