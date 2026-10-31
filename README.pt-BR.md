[English](./README.md) | **Português (Brasil)**

<p align="center">
  <a href="https://wppconnect.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://wppconnect-team.github.io/brand/wppconnect-dark.png" />
      <img src="https://wppconnect-team.github.io/brand/wppconnect-light.png" alt="WPPConnect" width="220" height="121" />
    </picture>
  </a>
</p>

# WPPConnect/mobile

Explore a automação do WhatsApp Web em uma aplicação móvel React Native.

Um projeto do ecossistema WPPConnect, mantido pela WPPConnect Team.

[Primeiros passos](#primeiros-passos) | [Documentação](#documentação) | [Como contribuir](#como-contribuir) | [Apoie a WPPConnect](#apoie-o-projeto)

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE) [![Documentation](https://img.shields.io/badge/docs-WPPConnect-blue)](https://wppconnect.io/) [![Open Collective](https://img.shields.io/badge/Open%20Collective-WPPConnect-blue)](https://opencollective.com/wppconnect)

> Aplicação experimental; a compatibilidade dos dispositivos e do serviço exige validação.

## Visão geral

Para contribuidores que experimentam a integração móvel do WA-JS em uma WebView. O repositório contém uma aplicação de desenvolvimento React Native 0.69 (`private: true`, versão 0.0.1). Não há lançamento confirmado na App Store ou Play Store aqui; compile pelos fontes e verifique a compatibilidade do dispositivo.

## Funcionalidades

- Destinos Android/iOS em React Native e integração de navegador incorporado.
- Definições de tipos WA-JS, estado local e navegação da aplicação.

## Primeiros passos

Exige Node.js/npm e os SDKs nativos do React Native **0.69**. Android precisa de SDK/emulador Android ou dispositivo conectado; iOS exige macOS, Xcode e CocoaPods. Use ferramentas compatíveis com esta versão antiga do React Native, sem presumir compatibilidade com os templates atuais.

```sh
git clone https://github.com/wppconnect-team/mobile.git
cd mobile
npm install
npm run start
```

Mantenha o Metro aberto. Em outro terminal use `npm run android` ou, no macOS, instale os pods com `cd ios && pod install` e execute `npm run ios` na raiz do repositório. O primeiro resultado é abrir a aplicação no dispositivo/emulador; autenticação no WhatsApp e suporte a recursos exigem verificação separada.

## Configuração

Revise [src](src/), [android](android/) e [ios](ios/) para as configurações da WebView e plataformas nativas. Os scripts incluem testes, lint e verificação TypeScript. A antiga previsão de lançamento em lojas não representa um compromisso de lançamento.

## Documentação

- [Código da aplicação](./src/)
- [Ambiente React Native 0.69](https://reactnative-archive-august-2023.netlify.app/docs/0.69/environment-setup)
- [Detalhes técnicos e agradecimentos preservados](documentation/readme-reference.md)

## Ecossistema WPPConnect

| Projeto | Finalidade | Quando usar |
| --- | --- | --- |
| [WPPConnect/WA-JS](https://github.com/wppconnect-team/wa-js) | Exponha funções do WhatsApp Web pela API `WPP` no navegador. | Executar código no navegador dentro do WhatsApp Web. |
| [Wppconnect Extension](https://github.com/wppconnect-team/wppconnect-extension) | Envie mensagens e anexos configurados por uma extensão Chrome para WhatsApp Web. | Usar uma interface Chrome sobre WA-JS. |

## Apoie o projeto

A WPPConnect é mantida por uma comunidade de código aberto. Seu apoio ajuda a financiar a manutenção, a infraestrutura, a documentação e o trabalho das pessoas que desenvolvem o ecossistema.

Se a WPPConnect ajuda seu projeto ou sua empresa, considere fazer uma contribuição pontual ou apoiar de forma recorrente.

**[Apoie a WPPConnect no Open Collective](https://opencollective.com/wppconnect)**

As contribuições são voluntárias. Consulte a página oficial para acompanhar as informações financeiras atuais. Você também pode ajudar com código, testes, documentação, traduções e relatos de problemas bem descritos.

Beneficiários oficiais adicionais em [.github/FUNDING.yml](.github/FUNDING.yml): [joaosouz4dev](https://github.com/sponsors/joaosouz4dev), [manfe](https://github.com/sponsors/manfe).

## Como contribuir

Contribuições de código, testes, exemplos, documentação e traduções são bem-vindas. Para mudanças maiores, discuta a proposta em uma issue primeiro. Ao relatar um problema, informe as versões do projeto/runtime, uma reprodução mínima e logs sem dados sensíveis. Atualize `README.md` e `README.pt-BR.md` na mesma alteração quando mudar instalação, configuração, funcionalidades, exemplos, licença ou arrecadação.

Após instalar as dependências de desenvolvimento, use as verificações pertinentes à sua alteração:

```sh
npm run tsc
npm run lint
npm test
```

Exemplos e testes que dependem de conta exigem validação separada com uma conta de teste autorizada. Nunca anexe credenciais ou arquivos de sessão a uma issue.

## Comunidade e suporte

Use as [issues do repositório](https://github.com/wppconnect-team/mobile/issues) para bugs reproduzíveis e propostas de funcionalidades. Para dúvidas de uso, participe pelos canais oficiais:

- [Discord](https://discord.gg/JU5JGGKGNG)
- [Telegram](https://t.me/wppconnect)
- [YouTube](https://www.youtube.com/c/wppconnect)

Relate vulnerabilidades em particular conforme [SECURITY.md](SECURITY.md).

Este projeto é independente e não é afiliado nem endossado pelo WhatsApp ou pela Meta. Siga os termos aplicáveis e obtenha autorização para operações de conta e mensagens.

## Licença

[Apache License 2.0 (Apache-2.0)](./LICENSE).

Copyright 2021 WPPConnect Team.

O documento jurídico original e os avisos de autoria existentes são preservados. Componentes de terceiros mantêm seus próprios termos.
