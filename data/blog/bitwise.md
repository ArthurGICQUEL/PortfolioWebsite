---
title: The usage of bitwise operators in Unity
date: '2022-03-26'
tags: ['unity']
draft: false
summary: Bitwise operations are some of the most basic operations you can give to a processor. They can be very useful in unity to manipulate layerMasks.
---

## The bitwise operators

When using bitwise operators, you need to consider numbers as bit strings. So when you see "10" don't think about it as a number but more as two bits, one equal to 1 and the other equal to 0. Once you undersand that, you just need to learn your basic logical operators tables of truth.

---

- 0 AND 0 = 0; 0 AND 1 = 0; 1 AND 1 = 1
- 0 OR 0 = 0; 0 OR 1 = 1; 1 OR 1 = 1;
- 0 XOR 0 = 0; 0 XOR 1 = 1; 1 XOR 1 = 0;

---

Then you just need to apply those to each bit of your bit strings

---

Some examples :

- 1001 AND 0101 = 0001
- 1010 OR 0011 = 1011
- 1010 XOR 0011 = 1001

---

## How to use it for the Unity layerMasks

Unity stores all the layers of a layerMask in a bit string, with the bit corresponding to each selected layer set to 1.

---

Exemple of layerMasks :

- 1st layer : 1
- 3rd layer : 100
- both 1st and 3rd layers : 101

---

A useful tool you can use to write layerMasks is the right shift operator : `<<` in C#.

---

- `1 = 1 << 0`
- `100 = 1 << 2`
- so nth layer selected layerMask = `1 << (n - 1)`

---

To write a layerMask with multiple layers you can use the OR operator `||` in C#. For exemple for 3rd and 5th layers :

- `(1 << 2) || (1 << 4)`

---

## Other use cases

Once you get comfortable using bitwise operators, you can use them for more than just layerMasks. Lets make an exemple with Pokémon types ! We will only use 4 types to keep it simple :

1.  Fire : 1
2.  Water : 10
3.  Plant : 100
4.  Electricity : 1000

---

Each pokemon will have a "typeMask" representing their single or multiple types.

---

- a Water type would be "10"
- a fire / electric type would be "1001"

---

If you wanted to display only pokemons of a certain type, you would need to create a search "typeMask", let's say we want to display all the plant pokemon, it would be equal to "100".

To display all of those plant pokemon, for each pokemon you'll need to verifiy this equation :

- pokemon.typeMask AND 100 != 0

Note that this will also display the pokemons that have more than just the plant type. For exemple, with a plant / water pokemon :

- 110 AND 100 != 0

---

If you want to only dispay the pokemon that only have the plant type, you'll simply need to check if your search and pokemon typeMasks are equal.

---

Lastly, if you want to display all the water and all the electricity pokemon :

- pokemon.typeMask AND (10 OR 1000)

In general :

- pokemon.typeMask AND (type1 OR type2 or type3 ...)

## Exemple in C#

```cs
public class Pokemon{
  public int typeMask;
}

public enum PokeTypes{
  fire,
  water,
  plant,
  electric
}

List<Pokemon> GetPokemonsOfTypes(List<Pokemon> pokemons, List<Poketypes> types){

  int searchMask = 0;

  foreach (int type in types){
    searchMask | (1 << (type - 1)
  }

  List<Pokemon> result = new List<Pokemon>();

  foreach (Pokemon pokemon in pokemons){
    if ((pokemon.typeMask & searchMask) != 0){
      result.Add(pokemon);
    }
  }

  return result;
}
```

## On the blog posts

So this is my first blog post about game development. If you see any flaws in it, feel free to tell me, I'm really looking into ways to improve myself. Also, if you didn't understand some parts, ask me and I will do my best to clarify !
