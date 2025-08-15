# #0 Estrutura de Dados + Algoritmos

O estudo de estruturas de dados envolve mais do que esse nome indica, pois não se pode pensar em estruturas de dados sem pensar em algoritmos. É como se um não vivesse sem o outro.
Não faz nenhum sentido termos estrutura de dados sem um algoritmo pra manipulá-las e entregar um resultado, da mesma forma que não podemos ter um algoritmo que não manipula dados, como somar, subtrair, comparar...

Por isso é essencial estudar ambos em conjunto.

As estruturas de dados servem basicamente para representar dados que abstraímos de situações ou objetos do mundo real que estamos interessados em processar.
Isso pode ser exemplificado com numeral e número:

* **Numeral** é um símbolo que representa a quantidade **número**.
* Quantidade é algo abstrato, algo que não conseguimos representar bem.
  Portanto usamos símbolos para representar isso.

Exemplo: a quantidade cinco pode ser representada de diversas formas como `5`, `V` e até mesmo `"cinco"` ou `"five"`.
São formas diferentes de representar a mesma quantidade.

Na computação isso acontece também: nós representamos toda a abstração através dos binários (`0` e `1`).
Entender bem como funciona o sistema binário, fazer operações aritméticas entre binários, é importante porque tudo em um computador são números binários.
Da mesma forma que nós convencionalmente usamos a **base decimal**, para o computador usamos a **base 2**.

Caso você não tenha familiaridade com operações em binário, recomendo ver qualquer vídeo no YouTube que já ajuda.
Mas antes, veja esse pra entender o **porquê** se usa o sistema binário nas máquinas:
[Why Binary](https://www.youtube.com/watch?v=thrx3SBEpL8)

---

Ótimo, agora que já entendemos que tudo em computador são `0` e `1` e que não há estruturas de dados sem algoritmos, podemos ir para o nosso próximo tópico:

---

## O que são Estruturas de Dados

Para entendermos esse tópico, vamos falar um pouco sobre matemática e seus conjuntos numéricos.
A teoria de conjuntos nos permite manipular qualquer tipo de elemento, e como a matemática lida com números, seus conjuntos são basicamente numéricos.

Alguns deles são:

* Conjunto dos naturais
* Conjunto dos inteiros
* Conjunto dos reais
* Conjunto dos complexos
  ... e por aí vai.

O que é importante pra nós aqui são os **atributos** que diferenciam os elementos de cada conjunto.
Por exemplo:

* No conjunto dos naturais precisamos somente do **atributo valor** (`5`)
* No conjunto dos inteiros precisamos do **atributo valor + sinal** (`-5`)
* Nos reais: **valor da parte inteira + sinal + valor da parte fracionária** (`4.237`)

Ou seja, **cada tipo de conjunto possui elementos com atributos diferentes**.

E cada conjunto também possui **operações entre seus elementos**.
Por exemplo, no conjunto dos naturais temos as operações de soma, subtração, multiplicação e divisão.

Da mesma forma:

> **Cada conjunto tem seus elementos definidos por um combo de atributos e as operações que podem ser realizadas sobre esses elementos.**

Toda essa explicação serve como analogia para entendermos o que são estruturas de dados.
Nesse ponto podemos chegar à conclusão de que:

> **Estruturas de dados: guardam atributos de um elemento e possuem uma relação direta com os algoritmos que manipulam essas estruturas.**

Assim, com as estruturas e os algoritmos, podemos dizer que um **tipo de dado** é definido por:

* Um conjunto de estrutura de dados
* E os algoritmos associados a elas

Bem parecido com os conjuntos numéricos que vimos antes.
A diferença é que os conjuntos numéricos são **infinitos e precisos**, duas limitações bem conhecidas em um computador.

---

### Exemplo prático

Vamos usar a linguagem C e entender seus tipos de dados com essa explicação:

Um `int` é um tipo de dado, pois:

* Possui atributos que definem o que é um int
* Possui algoritmos que o manipulam, como `soma++`, `subtração--`, `restoDaDivisao%`

```c
c = a + b;
```

Imaginando que `a`, `b` e `c` são `int`, podemos dizer que:

* `a`, `b` e `c` são estruturas de dados do tipo **inteiro**
* O `+` é o algoritmo que as manipula

---

### Tipos primitivos

Um tipo primitivo de dado sempre está associado a uma linguagem de programação.
Cada linguagem possui nativamente alguns tipos, por exemplo:

* Em C: `int`, `float`, `char`, `bool`...

Duas linguagens podem até ter tipos primitivos iguais, mas **isso não é regra**.
Cada linguagem possui seus tipos primitivos baseado em **um problema que ela quer resolver**, seja:

* Ensino de programação
* Cálculos científicos
* Processamento algébrico
* Gerência de banco de dados
* Processamento de matrizes
* Desenho vetorial
  ...e por aí vai.

O criador da linguagem define o que será incluído para facilitar o trabalho da sua área de foco.

> Aprender a usar tipos primitivos é importante, mas em projetos grandes você **precisa aprender a criar novas estruturas** que representem os atributos relevantes do seu problema.

Ou seja, **você precisa desenvolver novos tipos de dados**.

---

> *Caso queiram, eu recomendo pesquisarem por diferentes tipos primitivos nas linguagens e tentarem chegar a uma conclusão do porquê da existência de cada tipo na linguagem.*

---

### Como um dado é visto pelo computador

Nesse tópico, precisamos resgatar o que foi falado no começo do texto: como os bits são organizados para representar um dado.

Vamos usar o `int` como exemplo.

### Os dois problemas ao representar inteiros:

1. Os inteiros são **infinitos**
2. Eles incluem **números negativos**

Sobre o primeiro problema: a memória do computador é finita, então não dá pra representar infinitos números.

Sobre o segundo: como representar negativos usando apenas 0 e 1?

Vamos representar o número `7` com 5 bits:

```
00111
```

* 4 bits para o valor
* 1 bit para o sinal (o bit mais à esquerda, chamado **MSB**)

Logo:

* `00111` = +7 (bit do sinal é 0)
* `10111` = errado! (flipar só o bit do sinal não funciona)

---

### Complemento de 1

A ideia: flipar **todos os bits** de um número positivo para representar o negativo.

Exemplo:

* `+7` = `00111`
* Complemento de 1 → `11000` → representa `-7`

Mas esse método tem um problema: o **zero**.

* `+0` → `00000`
* `-0` → `11111`
  Ou seja, **duas representações para o 0**, o que é ruim para comparações.

---

### Complemento de 2

Para resolver o problema do zero:

1. Faz o complemento de 1
2. Soma `1` no **LSB** (bit menos significativo)

Exemplo com `7`:

* `00111` → complemento de 1 → `11000`
* `11000` + 1 → `11001` → `-7`

Verificando com `0`:

* `00000` → complemento de 1 → `11111` → `11111 + 1 = 100000`
  (ignora o *carry* do MSB → resultado final: `00000`)

Agora temos apenas uma representação para o `0`.
O **complemento de 2** é eficiente para representar inteiros com sinal.

---

Para os demais tipos, eu deixo pra vocês pesquisarem.

---

# Links para referência

* Float: [Padrão IEEE 754](https://0.30000000000000004.com/)
* String: [Tabela ASCII, EBCDIC, Unicode](https://www-user.tu-chemnitz.de/~heha/petzold/ch02b.htm)
* Complemento de 2: [Two's Complement (YouTube)](https://youtu.be/lKTsv6iVxV4)
* Notícia da Flávia Carvalho: [Uncle Bob no Tabnews](https://www.tabnews.com.br/FlaviaCarvalho/conselho-do-uncle-bob-contrate-programadores-que-nao-dependem-de-linguagens)

---

Espero que não tenha ficado muito denso.
Caso tenham alguma observação a fazer, deixe aqui nos comentários!
**Vamo que vamo, turma!**

Tem muito mais a ser feito :)
