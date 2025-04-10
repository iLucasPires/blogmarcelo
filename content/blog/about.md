---
title: "Criando meu primeiro projeto com Django e Uvicorn"
description: "Um guia simples e direto para começar um projeto Django rodando com Uvicorn, pronto para aplicações assíncronas."
date: 2025-04-09
tags: [django, uvicorn, python, backend]
cover: /images/posts/django-uvicorn.png
---

Nos últimos dias resolvi brincar um pouco com o Django, mas ao invés de rodar com o servidor padrão `runserver`, quis ir um pouco além e experimentar o Uvicorn — um servidor ASGI leve e rápido, compatível com aplicações assíncronas e perfeito pra quem pensa em usar **WebSockets**, **Django Channels** ou qualquer coisa async.

Neste post, compartilho o passo a passo que usei pra levantar meu primeiro projeto Django com Uvicorn.

## 🚀 Por que usar Uvicorn?

O `runserver` do Django é ótimo pra começar, mas ele roda em WSGI, o que não é ideal pra aplicações assíncronas. O **Uvicorn** roda em **ASGI**, o padrão assíncrono do Python. Se você pensa em escalar sua aplicação ou integrar com WebSockets ou serviços em tempo real, vale a pena começar com ele desde já.

## ⚙️ Setup inicial

Comecei do zero:

```bash
# Criei a pasta do projeto
mkdir meu-projeto-django
cd meu-projeto-django

# Ativei um ambiente virtual
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows

# Instalei as dependências
pip install django uvicorn
```

Depois criei o projeto:

```bash
django-admin startproject core .
```

## 📄 Configurando o ASGI

O Django já vem com um arquivo `asgi.py` na pasta do projeto. Não precisei mexer nele nesse primeiro momento.

A estrutura ficou assim:

```
meu-projeto-django/
├── core/
│   ├── asgi.py
│   ├── settings.py
│   └── urls.py
├── manage.py
```

## 🛠️ Rodando com Uvicorn

Com tudo pronto, bastou rodar:

```bash
uvicorn core.asgi:application --reload
```

> Dica: `core` é o nome da pasta do projeto. Se você deu outro nome, ajusta aí.

A aplicação subiu em `http://127.0.0.1:8000` e funcionou igual ao `runserver`, mas com o benefício de já estar preparada pro mundo async. ✨

## 💡 Considerações finais

Se você está começando com Django e quer dar o próximo passo, recomendo fortemente testar o Uvicorn. Não tem mistério e te prepara pra uma arquitetura mais moderna desde o começo.

Nos próximos posts, talvez eu fale sobre como integrar o **Django Channels** pra começar a brincar com WebSockets de verdade.

Se ficou com dúvida ou quer compartilhar algo, me chama lá no [GitHub](https://github.com/iLucasPires) ou pelo [LinkedIn](https://www.linkedin.com/in/lucaspires/). Tô sempre aberto a trocar ideia!
Espero que tenha gostado do post! Se você curtiu, não esquece de deixar um comentário ou compartilhar com os amigos. Até a próxima! 👋
