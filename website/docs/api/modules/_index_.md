[racing-bars](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Interfaces

* [DOMCustomEvent](../interfaces/_index_.domcustomevent.md)
* [Data](../interfaces/_index_.data.md)
* [Options](../interfaces/_index_.options.md)
* [Race](../interfaces/_index_.race.md)
* [WideData](../interfaces/_index_.widedata.md)

### Functions

* [generateId](_index_.md#generateid)
* [loadData](_index_.md#loaddata)
* [race](_index_.md#race)

## Functions

###  generateId

▸ **generateId**(`prefix`: string, `n`: number): *string*

*Defined in [lib/utils.ts:95](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/utils.ts#L95)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`prefix` | string | "racingbars" |
`n` | number | 8 |

**Returns:** *string*

___

###  loadData

▸ **loadData**(`URL`: string, `type`: "json" | "csv" | "tsv" | "xml"): *Promise‹[Data](../interfaces/_index_.data.md)[]› | Promise‹[WideData](../interfaces/_index_.widedata.md)[]›*

*Defined in [lib/load-data.ts:4](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/load-data.ts#L4)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`URL` | string | - |
`type` | "json" &#124; "csv" &#124; "tsv" &#124; "xml" | "json" |

**Returns:** *Promise‹[Data](../interfaces/_index_.data.md)[]› | Promise‹[WideData](../interfaces/_index_.widedata.md)[]›*

___

###  race

▸ **race**(`data`: [Data](../interfaces/_index_.data.md)[] | [WideData](../interfaces/_index_.widedata.md)[], `options`: Partial‹[Options](../interfaces/_index_.options.md)›): *[Race](../interfaces/_index_.race.md)*

*Defined in [lib/race.ts:15](https://github.com/hatemhosny/racing-bars-history/blob/4bb04c0/src/lib/race.ts#L15)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [Data](../interfaces/_index_.data.md)[] &#124; [WideData](../interfaces/_index_.widedata.md)[] | - |
`options` | Partial‹[Options](../interfaces/_index_.options.md)› | {} |

**Returns:** *[Race](../interfaces/_index_.race.md)*
