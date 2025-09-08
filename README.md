# BeWear - E-commerce Full Stack

## 🎯 Sobre o Projeto

Esta é uma aplicação de e-commerce completa desenvolvida como **projeto de portfólio** para demonstrar habilidades em desenvolvimento web moderno. O BeWear é uma loja virtual de roupas que oferece uma experiência de compra completa, desde a navegação de produtos até o checkout e pagamento.

**🔗 Deploy:** [https://full-stack-ecommerce-gules.vercel.app/](https://full-stack-ecommerce-gules.vercel.app/)

> **Nota:** A aplicação foi desenvolvida com foco **mobile-first**, priorizando a experiência em dispositivos móveis.

## 🚀 Funcionalidades

- ✅ Catálogo de produtos com filtros e busca
- ✅ Carrinho de compras dinâmico
- ✅ Sistema de autenticação completo
- ✅ Checkout com múltiplas formas de pagamento
- ✅ Gerenciamento de endereços de entrega
- ✅ Integração com Stripe para pagamentos
- ✅ Interface responsiva e moderna
- ✅ Validação de formulários robusta

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15 (App Router)** - Framework React para produção com renderização server-side
- **TypeScript** - Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e consistente
- **Shadcn/UI** - Biblioteca de componentes acessíveis e customizáveis
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de schemas TypeScript-first

### Backend & Banco de Dados
- **PostgreSQL** - Banco de dados relacional robusto
- **Drizzle ORM** - ORM TypeScript-first para interação com banco de dados
- **Better Auth** - Sistema de autenticação moderno e seguro

### Ferramentas & Integrações
- **Stripe** - Processamento de pagamentos
- **React Query** - Gerenciamento de estado servidor
- **React Number Format** - Formatação de inputs com máscaras

## 🎨 Por que essas tecnologias?

### Next.js 15 com App Router
Escolhido pela performance superior, SEO otimizado e a nova arquitetura de roteamento que oferece melhor experiência de desenvolvimento e carregamento de páginas.

### TypeScript
Implementado para garantir código mais seguro, melhor IntelliSense e redução de bugs em produção, essencial para aplicações comerciais.

### Tailwind CSS + Shadcn/UI
Combinação que permite desenvolvimento rápido mantendo consistência visual e acessibilidade, com componentes pré-construídos e customizáveis.

### Drizzle ORM
Escolhido por ser type-safe, performático e oferecer uma sintaxe SQL-like familiar, facilitando queries complexas e migrações.

### React Hook Form + Zod
Dupla poderosa para formulários performáticos com validação robusta, reduzindo re-renders desnecessários e garantindo dados consistentes.

### Better Auth
Solução moderna de autenticação que oferece segurança sem comprometer a experiência do usuário.

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Conta no Stripe (para pagamentos)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/TManoloss/FullStack-ecommerce.git
cd bewear
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure o banco de dados:
```bash
npm run db:push
npm run db:seed
```

5. Execute o projeto:
```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000)

## 📱 Design Mobile-First

A aplicação foi desenvolvida priorizando a experiência mobile, considerando que a maioria dos usuários de e-commerce utilizam dispositivos móveis. O design é totalmente responsivo e se adapta perfeitamente a diferentes tamanhos de tela.

## 🎯 Objetivo do Portfólio

Este projeto demonstra:
- **Arquitetura escalável** com separação clara de responsabilidades
- **Código limpo** seguindo princípios SOLID e Clean Code
- **Experiência do usuário** moderna e intuitiva
- **Integração com APIs externas** (Stripe)
- **Gerenciamento de estado** eficiente
- **Validação robusta** de dados
- **Segurança** em autenticação e pagamentos
- **Performance otimizada** com Next.js

## 📄 Licença

Este projeto foi desenvolvido para fins de portfólio e demonstração de habilidades técnicas.

---

Desenvolvido com ❤️ por Manoel Carvalho como projeto de portfólio.
