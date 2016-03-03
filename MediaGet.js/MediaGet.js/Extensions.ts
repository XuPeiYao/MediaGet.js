interface NodeList {
    toArray: ()=>Array<Node>;
}
NodeList.prototype.toArray = function (): Array<Node> {
    var result = new Array<Node>();
    for (var i = 0; i < this.length; i++)result.push(this[i]);
    return result;
}