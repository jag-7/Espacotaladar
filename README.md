# Espaço Taladar - Menu Digital

Este é um menu digital interativo para o restaurante Espaço Taladar, desenvolvido com HTML, CSS e JavaScript.

## Funcionalidades

- Menu digital com categorias de produtos
- Carrinho de compras interativo
- Seleção de quantidade de produtos
- Formulário de informações do cliente
- Integração com WhatsApp para envio de pedidos
- Design responsivo para diferentes dispositivos

## Estrutura de Arquivos

```
.
├── index.html          # Página principal
├── styles.css          # Estilos do site
├── script.js           # Funcionalidades JavaScript
├── assets/            # Pasta de imagens
│   ├── logo.png
│   ├── hamburger-classico.jpg
│   ├── hamburger-duplo.jpg
│   ├── pao-frances.jpg
│   ├── pao-hamburger.jpg
│   ├── refrigerante.jpg
│   └── suco.jpg
└── README.md          # Este arquivo
```

## Configuração

1. Clone este repositório
2. Adicione suas imagens na pasta `assets/`
3. No arquivo `script.js`, substitua `SEU_NUMERO_AQUI` pelo número do WhatsApp do restaurante (apenas números, sem caracteres especiais)
4. Personalize os produtos no objeto `produtos` no arquivo `script.js`

## Personalização

### Produtos
Para adicionar ou modificar produtos, edite o objeto `produtos` no arquivo `script.js`. Cada produto deve seguir a estrutura:

```javascript
{
    id: número,
    nome: "Nome do Produto",
    descricao: "Descrição do produto",
    preco: número,
    imagem: "caminho/para/imagem.jpg"
}
```

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`, editando as variáveis CSS:

```css
:root {
    --primary-color: #D89B49;    /* Cor principal */
    --dark-brown: #4A2C2A;      /* Marrom escuro */
    --light-beige: #F5E6D3;     /* Bege claro */
    --white: #FFFFFF;           /* Branco */
}
```

## Uso

1. Abra o arquivo `index.html` em um navegador web
2. Navegue pelas categorias de produtos
3. Selecione a quantidade desejada
4. Adicione ao carrinho
5. Preencha as informações do cliente
6. Clique em "Finalizar Pedido" para enviar via WhatsApp

## Requisitos

- Navegador web moderno com suporte a JavaScript
- Conexão com a internet (para carregar fontes e ícones)

## Suporte

Para suporte ou dúvidas, entre em contato com o desenvolvedor. 