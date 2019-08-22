//Lambda Calc

/**
 * Identity
 * YI.I
 */
type I = (x: any) => any;
const I: I = x => x;

//prints 5
console.log("Identity of 5 is", I(5));

/**
 * MockingBird
 * Yf.ff
 * M = f => f(f)
 */
type M = (f: any) => any;
const M: M = f => f(f);

console.log("Self invocation of Identity is", M(I)); //prints Identity Function (x => x)
console.log("\n");

/**
 * Kestrel
 * Yab.a
 * K := a => b => a
 */
type T<T, V> = (a: T) => (b: V) => T;
const K: T<any, any> = a => b => a;

console.log("Kestrel of [first, second] is", K("first")("second")); //prints "first"
/**
 * Kite
 * Yab.b
 * Ki := a => b => b
 */
type F<T, V> = (a: T) => (b: V) => V;
const Ki: F<any, any> = a => b => b;

console.log("Kite of [first, second] is ", Ki("first")("second")); //prints "second"
console.log("\n");
/**
 * Cardinal
 * Yfab.fba
 * C := f => a => b => f(b)(a)
 */
type C<F, X, Y> = (f: F) => (x: X) => (y: Y) => F;
const C: C<any, any, any> = f => a => b => f(b)(a);

//prints "second" by reversing K i.e. Ki
console.log("Cardinal of the Kestrel of [1, 2] is", C(K)(1)(2));

//prints "first" by reversing Ki i.e. K
console.log("Cardinal of the Kite of [1, 2] is", C(Ki)(1)(2));
console.log("\n");
/**
 * True and False
 * True = K(T)(F) => T
 * False = Ki(T)(F) => F
 */
const True = K(true)(false);
//prints true by returning first argument.
console.log("Kestrel of [true, false] is", True);

const False = Ki(true)(false);
// prints false by returning second argument
console.log("Kite of [true, false] is", False);
console.log("\n");
/**
 * Negation
 * Yp.p Ki k
 * N := p => p(ki)(k)
 */
type N = (p: any) => any;
const Not = p => p(Ki)(K);

//prints Kite (a => b => a) by returning the second argument Y k ki k => k
console.log("Not of Kestrel is", Not(K));

//prints Kestrel (a => b => b) by returning first argument Y ki ki k => ki
console.log("Not of Kite is", Not(Ki));

console.log("\n");
/**
 * And
 * Ypq.pqF
 * A := p => q => p(q)(p)
 */
type A = (p: any) => (q: any) => any;
const AND = p => q => p(q)(p);

//prints false (Kite) (T => F => F) by Y k ki . k ki k => Y k ki k => ki
console.log("true (K) AND false (Ki) is", AND(K)(Ki)(true)(false));

//prints false (Kite) (T => F => F) by Y ki k . ki k ki => Y ki k ki => ki
console.log("false (Ki) AND true (K) is", AND(Ki)(K)(true)(false));

//prints true (Kestrel) (T => F => T) by Y k k . k k k => Y k k k => k
console.log("true (K) AND true (K) is", AND(K)(K)(true)(false));

//prints false (Kite) (T => F => F) by Y ki ki . ki ki ki => ki
console.log("false (Ki) and false (ki) is", AND(Ki)(Ki)(true)(false));
console.log("\n");

/**
 * Or
 * Ypq.ppq
 * V := p => q => p(p)(q)
 */
type V = (p: any) => (q: any) => any;
const OR = p => q => p(p)(q);

//prints true (Kestrel) (T => F => T) by Y k ki . k k ki => Y k k ki => k
console.log("true (K) OR false (Ki) is", OR(K)(Ki)(true)(false));

//prints true (Kestrel) (T => F => T) by Y ki k . ki ki k => Y ki ki k => k
console.log("fTlse (Ki) OR true (K) is", OR(Ki)(K)(true)(false));

//prints true (Kestrel) (T => F => T) by Y k k . k k k => Y k k k => k
console.log("true (K) OR true (K) is", OR(K)(K)(true)(false));

//prints false (Kite) (T => F => F) by Y ki ki . ki ki ki => ki
console.log("false (Ki) OR false (ki) is", OR(Ki)(Ki)(true)(false));
console.log("\n");
/**
 * Beq
 * Ypq.pq(~q)
 * E := p => q => p(q)(~q)
 */
type E = (p: any) => (q: any) => any;
const E = p => q => p(q)(Not(q));

//prints false (Kite) (T => F => F) by Y k ki . k ki (ki ki k)  => Y k ki k => ki
console.log("true (K) EQUALS false (Ki) is", E(K)(Ki)(true)(false));

//prints false (Kite) (T => F => F) by Y ki k . ki k (k ki k) => Y ki k ki => ki
console.log("false (Ki) EQUALS true (K) is", E(Ki)(K)(true)(false));

//prints true (Kestrel) (T => F => T) by Y k k . k k (k ki k) => Y k k ki => k
console.log("true (K) EQUALS true (K) is", E(K)(K)(true)(false));

//prints true (Kestrel) (T => F => T) by Y ki ki . ki ki (ki k ki) => Y ki ki k => k
console.log("false (Ki) EQUALS false (ki) is", E(Ki)(Ki)(true)(false));
console.log("\n");
//Logging
