# 🌿 Ateliê Terra - Catálogo de Produtos

Um e-commerce moderno para artesanato e produtos naturais, desenvolvido com Next.js e React. Apresenta uma experiência de usuário fluida com menu mobile animado, catálogo de produtos responsivo e checkout simulado.

## ✨ Características

- **Design Responsivo**: Layout otimizado para desktop, tablet e mobile
- **Menu Mobile Animado**: Menu lateral deslizante com animação suave e design arredondado
- **Hero Section**: Banner de destaque com imagem de fundo e chamada para ação
- **Catálogo de Produtos**: Grid dinâmico com emojis, preços e badges
- **Carrinho de Compras**: Drawer lateral com gerenciamento de quantidade
- **Newsletter**: Formulário de inscrição com validação
- **Checkout Simulado**: Interface de pagamento interativa
- **Footer Completo**: Links de navegação e ícones de redes sociais

## 🎨 Design

- **Paleta de Cores**: Verde musgo (moss), pedra (stone) e areia (sand)
- **Tipografia**: Geist Sans
- **Componentes**: Construídos com React e CSS puro
- **Animações**: Transições suaves e efeitos de scroll

## 🚀 Tecnologias

- **Next.js 16** - Framework React com renderização no servidor
- **React 18** - Biblioteca UI
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones SVG
- **TypeScript** - Tipagem estática

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/diovani-matos/catalogo_produtos.git

# Entre no diretório
cd catalogo_produtos

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
catalogo_produtos/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página inicial
│   └── checkout.css         # Estilos do checkout
├── components/
│   ├── Navbar.tsx           # Barra de navegação com menu mobile
│   ├── LandingHero.tsx      # Seção hero
│   ├── CatalogApp.tsx       # Catálogo de produtos
│   ├── CounterBadge.tsx     # Badge do carrinho
│   └── checkout/
│       └── CheckoutClient.tsx # Interface de checkout
└── public/                  # Arquivos estáticos
```

## 🎯 Funcionalidades Principais

### Menu Mobile
- Abre lateralmente com animação suave
- Design arredondado com sombra elevada
- Backdrop escuro para melhor UX
- Fecha automaticamente ao clicar em um link

### Carrinho de Compras
- Adicionar/remover produtos
- Ajustar quantidade
- Cálculo automático do total
- Toast de confirmação

### Produtos
- Display em grid responsivo
- Badges de categoria
- Preços e promoções
- Emojis como imagens dos produtos

## 📱 Responsividade

- **Desktop**: Layout otimizado em 1200px de máximo
- **Tablet**: Adaptações para 768px
- **Mobile**: Menu drawer e grid ajustado para pequenas telas

## 🚢 Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com):

```bash
npm run build
```

## 📝 Licença

Este projeto é de código aberto e está disponível para fins educacionais e comerciais.

## 👨‍💻 Autor

**Diovani Matos**
- GitHub: [@diovani-matos](https://github.com/diovani-matos)

---

Desenvolvido com ❤️ para o portfólio
