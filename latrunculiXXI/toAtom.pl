toAtom(Element, AtomElement) :-
    open('/latronculli_cache', write, StreamWrite),
    write(StreamWrite, '\''),
    write(StreamWrite, Element),
    write(StreamWrite, '\''),
    write(StreamWrite, '.'),
    close(StreamWrite),
    open('/latronculli_cache', read, StreamRead),
    read(StreamRead, AtomElement),
    close(StreamRead),
    atom(AtomElement).
    