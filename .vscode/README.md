# Smart Backend

**IMPORTANTE: Para facilitar a visualização desse guia, entre em https://dillinger.io/ e copie o código-fonte do `README.md` no editor à esquerda! O visualizador do AWS CodeCommit não suporta adequadamente a visualização de arquivos em Markdown**

Repositório que contem o backend serverless das aplicações Vallourec.smart, utilizando o [Serverless  Framework](https://serverless.com/) em conjunto com as ferramentas cloud da [AWS](https://aws.amazon.com/pt/).

## Instalação

##### 1. Serverless Framework
Após clonado o repositório, deve ser instalada a ferramenta serverless globalmente usando o comando:

`npm install -g serverless`

> É importante confirmar se o pacote foi instalado corretamente. Para isso, execute o comando `sls` e observe o seu output.

##### 2. Credenciais AWS
O AWS CLI deve estar instalado conforme [esse guia](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-install.html) e as credenciais AWS devem ser devidamente configuradas por meio do comando `aws configure` (por padrão, será criado um arquivo em `~/.aws/credentials` em sistemas UNIX contendo os dados preenchidos).

##### 3. Yarn
Devido a um problema de resolução de depêndencias do `npm`, deve ser utilizado o gerenciador de depêndencias [yarn](https://yarnpkg.com/pt-BR/). Ele funciona de forma similar ao `npm`, podendo ser utilizado para qualquer depêndencia. Instale-o [seguindo esse guia](https://yarnpkg.com/pt-BR/docs/install).

Após isso, navegue até a pasta raiz do projeto e instale as depêndencias do NodeJS com o comando:

`yarn`

Se tudo ocorrer corretamente, os módulos serão instalados na pasta `node_modules` e também será gerada uma pasta `.dynamodb` (que pode estar oculta) no diretório raiz, utilizada para o desenvolvimento local simulando o AWS DynamoDB. Caso não tenha sido instalado corretamente, você pode utilizar o script:

`yarn run install-dynamo`

para instalá-lo!

##### 4. Variáveis de Ambiente
Duplique o arquivo `env.default.yml` e o renomeie para `env.yml` na pasta raiz, editando-o para utilizar as variáveis de ambiente corretas.

## Desenvolvimento Local
##### Atualização de Seeds do DynamoDB
O DynamoDB local utiliza de `seeds` copiadas da versão em produção para simular um ambiente real durante o desenvolvimento offline. **Na primeira utilização e toda vez que quiser atualizar a instância do DynamoDB local**, execute o comando

`yarn run update-seeds`

para gerar novamente as seeds.

##### Execução
Após a instalação e geração de seeds iniciais, para executar o servidor localmente, é necessário apenas executar o comando:

`yarn start`

Após isso, o servidor irá executar em http://localhost:3000 e o container com DynamoDB poderá ser operado em http://localhost:8000/shell.

**IMPORTANTE: Para que o backend consiga acessar o banco de dados, é necessário conectar à VPN da Vallourec, caso contrário as Lambdas irão resultar em timeout!**

##### Debug

Para realizar o debug do projeto utilizando o inspetor do Google Chrome, use o seguinte comando:

`yarn run debug`

Caso esteja em ambiente **windows**, utilize:

`yarn run debug-windows`

O backend será executado offline com as flags de debug ativadas, bem como o suporte a breakpoints no código-fonte pelo inspetor do chrome!

**IMPORTANTE: Para que você consiga acessar os arquivos .js pelo inspetor é necessário acessar seus respectivos endpoints pelo menos uma vez. Isso é necessário pois o Serverless Framework em modo offline invoca os scripts de suas lambdas sob demanda, de forma que só são "carregados" e visualizáveis pelo processo node a partir da primeira execução.**

##### Debug com VSCode
Para realizar o debug do projeto utilizando o VSCode, utilize a seguinte configuração no `launch.json` na seção de debug:

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug",
            "cwd": "${workspaceRoot}",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "debug"
            ],
            "port": 9229
        }
    ]
}
```

Caso esteja em ambiente **windows**, utilize:

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug",
            "cwd": "${workspaceRoot}",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "run",
                "debug-windows"
            ],
            "port": 9229
        }
    ]
}
```

O backend será executado offline com as flags de debug ativadas, bem como o suporte a breakpoints no código-fonte pelo VSCode!
