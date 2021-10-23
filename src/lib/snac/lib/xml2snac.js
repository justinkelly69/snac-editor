import { DOMParser } from 'xmldom'
import { v4 } from 'uuid'
import { newText, newCDATA, newComment, newPI } from './clone'

export const xml2snac = xml => ({
    _: 'N',
    S: '@@@',
    N: '@@@',
    A: {},
    C: [xml2element(new DOMParser().parseFromString(xml, 'text/xml').documentElement)]
})

export const xml2snac1 = xml => {
    const snac = {
        _: '@',
        R: xml2element(new DOMParser().parseFromString(xml, 'text/xml').documentElement)
    }
    //console.log('snac', JSON.stringify(snac, null, 4))
    return snac
}

export const xml2element = (doc) => {
    return ({
        _: `N${v4()}`,
        S: doc.prefix,
        N: doc.localName,
        A: xml2atts(doc.attributes),
        C: xml2kids(doc.childNodes),
        q: false
    })
}

export const xml2atts = (atts) => {
    const A = {}
    Array(atts.length).fill().forEach((_, i) => {
        if(atts[i].prefix === null) {
            A.hasOwnProperty('@') || (A['@'] = {})
            A['@'][atts[i].localName] = atts[i].value
        }
        else {
            A.hasOwnProperty(atts[i].prefix) || (A[atts[i].prefix] = {})
            A[atts[i].prefix][atts[i].localName] = atts[i].value
        }
    })
    return A
}

export const xml2kids0 = kids => {
    let children = [], depth = 0, prev = 'X'
    Array(kids.length).fill().forEach((_, index) => {
        const kid = kids[index]
        prev !== 'T' && kid.nodeType !== 3 && (
            [children, depth, prev] = [[...children, newText('')], depth + 1, 'T']
        )
        kid.nodeType === 1 && (
            [children, depth, prev] = [[...children, xml2element(kid)], depth + 1, 'N']
        )
        kid.nodeType === 3 && (
            [children, depth, prev] = [[...children, newText(kid.data)], depth + 1, 'T']
        )
        kid.nodeType === 4 && (
            [children, depth, prev] = [[...children, newCDATA(kid.nodeValue)], depth + 1, 'D']
        )
        kid.nodeType === 8 && (
            [children, depth, prev] = [[...children, newComment(kid.nodeValue)], depth + 1, 'M']
        )
        kid.nodeType === 7 && (
            [children, depth, prev] = [[...children, newPI(kid.target, kid.data,)], depth + 1, 'P']
        )
    })
    return children
}

export const xml2kids = kids => {
    //console.log('kids', JSON.stringify(kids.length, null, 4))
    let children = [], prev='X'
    Array(kids.length).fill().forEach((_, index) => {
        const kid = kids[index]
        if(prev !== 'T' && kid.nodeType !== 3) {
            prev = 'T'
            children.push(newText(''))
        }
        else if(kid.nodeType === 1){
            prev = 'N'
            children.push(xml2element(kid))
        }
        else if(kid.nodeType === 3){
            prev = 'T'
            children.push(newText(kid.data))
        }
        else if(kid.nodeType === 4){
            prev = 'D'
            children.push(newCDATA(kid.nodeValue))
        }
        else if(kid.nodeType === 8){
            prev = 'M'
            children.push(newComment(kid.nodeValue))
        }
        else if(kid.nodeType === 7){
            prev = 'P'
            children.push(newPI(kid.target, kid.data))
        }
    })
    return children
}

