[racing-bars](../README.md) › [Globals](../globals.md) › ["lib/index"](../modules/_lib_index_.md) › [Race](_lib_index_.race.md)

# Interface: Race

## Hierarchy

* **Race**

## Index

### Properties

* [createScroller](_lib_index_.race.md#createscroller)
* [dec](_lib_index_.race.md#dec)
* [destroy](_lib_index_.race.md#destroy)
* [fastforward](_lib_index_.race.md#fastforward)
* [getAllDates](_lib_index_.race.md#getalldates)
* [getDate](_lib_index_.race.md#getdate)
* [groups](_lib_index_.race.md#groups)
* [inc](_lib_index_.race.md#inc)
* [loop](_lib_index_.race.md#loop)
* [rewind](_lib_index_.race.md#rewind)
* [selections](_lib_index_.race.md#selections)
* [setDate](_lib_index_.race.md#setdate)
* [start](_lib_index_.race.md#start)
* [stop](_lib_index_.race.md#stop)

## Properties

###  createScroller

• **createScroller**: *function*

*Defined in [lib/models.ts:12](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L12)*

#### Type declaration:

▸ (): *void*

___

###  dec

• **dec**: *function*

*Defined in [lib/models.ts:8](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L8)*

#### Type declaration:

▸ (`value`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

___

###  destroy

• **destroy**: *function*

*Defined in [lib/models.ts:24](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L24)*

#### Type declaration:

▸ (): *void*

___

###  fastforward

• **fastforward**: *function*

*Defined in [lib/models.ts:5](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L5)*

#### Type declaration:

▸ (): *void*

___

###  getAllDates

• **getAllDates**: *function*

*Defined in [lib/models.ts:11](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L11)*

#### Type declaration:

▸ (): *string[]*

___

###  getDate

• **getDate**: *function*

*Defined in [lib/models.ts:9](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L9)*

#### Type declaration:

▸ (): *string*

___

###  groups

• **groups**: *object*

*Defined in [lib/models.ts:18](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L18)*

#### Type declaration:

* **hide**(): *function*

  * (`group`: string): *void*

* **show**(): *function*

  * (`group`: string): *void*

* **showAll**(): *function*

  * (): *void*

* **showOnly**(): *function*

  * (`group`: string): *void*

___

###  inc

• **inc**: *function*

*Defined in [lib/models.ts:7](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L7)*

#### Type declaration:

▸ (`value`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

___

###  loop

• **loop**: *function*

*Defined in [lib/models.ts:6](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L6)*

#### Type declaration:

▸ (): *void*

___

###  rewind

• **rewind**: *function*

*Defined in [lib/models.ts:4](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L4)*

#### Type declaration:

▸ (): *void*

___

###  selections

• **selections**: *object*

*Defined in [lib/models.ts:13](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L13)*

#### Type declaration:

* **select**(): *function*

  * (`name`: string): *void*

* **unselect**(): *function*

  * (`name`: string): *void*

* **unselectAll**(): *function*

  * (): *void*

___

###  setDate

• **setDate**: *function*

*Defined in [lib/models.ts:10](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L10)*

#### Type declaration:

▸ (`inputDate`: string | Date): *void*

**Parameters:**

Name | Type |
------ | ------ |
`inputDate` | string &#124; Date |

___

###  start

• **start**: *function*

*Defined in [lib/models.ts:2](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L2)*

#### Type declaration:

▸ (): *void*

___

###  stop

• **stop**: *function*

*Defined in [lib/models.ts:3](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/models.ts#L3)*

#### Type declaration:

▸ (): *void*
