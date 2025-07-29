# #1 Estrutura de Dados  – Complexidade de Algoritmos

Já faz um tempo que não escrevo sobre esse assunto mas, antes tarde do que nunca 🤝

Continuando da onde eu parei ([Estrutura de Dados #0](https://www.tabnews.com.br/meritissimo1/estrutura-de-dados-0)), hoje eu quero falar sobre **Complexidade de Algoritmos** e por que você deveria pensar duas vezes antes de colocar um `while`/`for` dentro do outro.

Já deixando um disclaimer:

> Eu não sou nenhum professor universitário que entende 100% do assunto, sou só um estudante que gostou da matéria Estrutura de Dados :)

---

## O que é Complexidade de Algoritmos?

O estudo de **Complexidade de Algoritmos** envolve analisar o **tempo de execução** de determinado algoritmo.
Por isso, esse assunto também pode ser chamado de **Tempo de Complexidade**, ou em inglês: **Time Complexity**.

A importância de se estudar quanto tempo seu algoritmo levará pra ser executado numa determinada situação parece ser bastante autoexplicativa, mas dando um exemplo:

Imagine que você é um(a) engenheiro(a) de software da **Twitch** e que agora você precise ordenar todos os canais online baseado no número de espectadores de cada canal.
Dependendo da forma que você faça isso, talvez o seu algoritmo leve **muito tempo para terminar a execução**, gastando muito recurso de processamento.

E levando em consideração que estamos falando de uma grande empresa com muitos usuários e muitos dados, isso seria bem ruim.
Nesse caso, você teria que, **antes mesmo de começar a escrever qualquer código**, analisar como o algoritmo se comportaria **no pior caso possível**.

Essa análise é feita usando uma **notação matemática** (eu acho que exclusiva da computação) conhecida como:

> **Notação Big O** (ou **O Grande**)

A **Notação Big O** foca em analisar o **comportamento do algoritmo no pior caso possível**.
Existem outras notações para melhor caso e caso médio, mas vamos ver aqui **somente a Big O** mesmo.

---

## Exemplos de Notação Big O

* `O(1)` → As instruções são constantes, independente do número de elementos.
* `O(n)` → No pior caso teremos `n` instruções e o crescimento é linear.
* `O(n²)` → No pior caso teremos `n²` instruções e o crescimento é exponencial.
* `O(log(n))` → No pior caso teremos `log₂(n) = x`, onde `x` é o número de instruções.

📈 Ilustração do crescimento:

![Big O Notation](https://adrianmejia.com/images/time-complexity-examples.png "Big O Notation")

---

## Aprendendo na prática

A forma como eu aprendi complexidade foi **analisando algoritmos**, e é o que nós vamos fazer agora!

Trouxe aqui **3 algoritmos de ordenação** bem conhecidos:

* Insertion Sort
* Selection Sort
* Bubble Sort

Para entender a complexidade de um algoritmo, precisamos entender **o que ele faz** e principalmente **COMO ele faz**.

---

### Insertion Sort

> Para cada elemento, busca-se a posição correta no vetor.
> Ou seja, **para cada N elementos temos que percorrer N posições**.

🔁 Logo, sua complexidade é:
**`O(n²)`**

---

### Selection Sort

> Para cada posição, busca-se o elemento correto no vetor.
> Ou seja, **para cada N posições temos que percorrer N elementos**.

🔁 Logo, sua complexidade é:
**`O(n²)`**

---

### Bubble Sort

> Para cada par de elementos, busca-se a posição correta relativa no vetor.
> Ou seja, **para cada N pares de elementos temos que percorrer N posições**.

🔁 Logo, sua complexidade é:
**`O(n²)`**

---

Só com base nessas simples frases, **qualquer pessoa** que não seja um [programador Chaves](https://www.tabnews.com.br/matheuspazinati/o-programador-chaves) haha, consegue implementar os algoritmos acima em **QUALQUER LINGUAGEM**!

Inclusive, **recomendo fortemente** vocês implementarem esses algoritmos até pra entenderem o que eu falei lá no início — fica aí o desafio.

> Exercitem essa dica de **resumir o algoritmo em poucas palavras**, já deixando clara a complexidade.

Se quiserem, **respondam aqui como fizeram 😁**

---

## Materiais adicionais

* 📹 [Insertion Sort 💃](https://youtu.be/EdIKIf9mHk0)
* 📹 [Selection Sort 💃](https://youtu.be/0-W8OEwLebQ)
* 📹 [Bubble Sort 💃](https://www.youtube.com/watch?v=lyZQPjUT5B4)
