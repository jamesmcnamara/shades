/*
 * DSL Parser
 * ==========================
 *
 * Accepts strings of attributes and indexing, i.e. attr1[0].attr2
 */

{
    function buildParseList(type, val, next) {
        var parsed = { type: type, value: val} 
        if (next) {
            return [parsed].concat(next[1])
        }
        else {
            return parsed
        }
        
    }
}


Attribute
  = attr:Id next:Seq {
    return buildParseList('attr', attr, next)
}

Index 
  = idx:Num "]" next:Seq {
    return buildParseList('idx', idx, next)
}

Seq
  = (("." Attribute) / ("[" Index))?

Id 
  = [a-zA-Z][a-zA-Z0-9_]* { 
    return text() 
}

Num = [0-9]+ {return text()}
