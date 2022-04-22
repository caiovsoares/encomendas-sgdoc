const gerador = (str1, str2, str3) => {
  const n = ((Math.random() * 10 + 1) % 2).toFixed(0);
  switch (n) {
    case '0':
      return str1;
    case '1':
      return str2;
    case '2':
      return str3;
  }
};
export const exampleMails = (q) => {
  let bigMails = new Array(q);
  bigMails.fill(1);
  bigMails = bigMails.map((e, i) => {
    return {
      id: i,
      tracking: `BR${(Math.random() * 899999999 + 100000000).toFixed(0)}BR`,
      type: gerador('Caixa', 'Pacote', 'Envelope'),
      size: gerador('Pequeno', 'Medio', 'Grande'),
      sender: gerador('Mercado Livre', 'Amazon', 'Shopee'),
      destiny: {
        id: i,
        fullName: gerador('Caio Soares', 'Vinicius Amancio', 'Carol Castro'),
        warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
        classYear: gerador('2020', '2021', '2022'),
        cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
        identity: gerador('20YS0162', '21YS0241', '22YS0121'),
      },
      created_at: gerador(
        '2021-06-25 14:35:22',
        '2021-06-26 09:35:22',
        '2021-04-12 12:15:22'
      ),
      received_at: gerador(
        '2021-08-03 16:45:22',
        '2021-07-02 14:22:22',
        '2021-11-11 13:05:22'
      ),
      receiver: gerador(
        {
          id: i,
          fullName: gerador(
            'Caio Vinicius Amancio Soares',
            'Gabriel Silva Ramos',
            'Clarice Outrora Outronome'
          ),
          warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
          classYear: gerador('2020', '2021', '2022'),
          cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
          identity: gerador('20YS0162', '21YS0241', '22YS0121'),
        },
        {
          id: i,
          fullName: gerador(
            'Caio Vinicius Amancio Soares',
            'Gabriel Silva Ramos',
            'Clarice Outrora Outronome'
          ),
          warName: gerador('C4 Mariane Mocker', 'C3 Fagundes', 'C2 Victoria'),
          classYear: gerador('2020', '2021', '2022'),
          cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
          identity: gerador('20YS0162', '21YS0241', '22YS0121'),
        },
        null
      ),
    };
  });

  return bigMails;
};
export function removeAccent(newStringComAcento) {
  let string = newStringComAcento || '';
  let mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (let letra in mapaAcentosHex) {
    let expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }

  return string;
}
export function search(value, object, checkVoid) {
  //value = a string a ser pesquisada
  //item = o objeto que esta sendo comparado no momento
  //...campos = os nomes dos campos que queremos comparar

  //inicializamos o valor sem acentos em maiusculo
  value = removeAccent(value).toUpperCase();

  //criamos a lista de campos que serão comparados sem acentos e em maiusculo
  const fields = sweepObject(object).map((e) =>
    removeAccent(e?.toString()).toUpperCase()
  );

  //verificamos se o valor esta vazio
  const valorVazio = value.length < 3; //(value == "") || (value == " ")

  //retornamos o resultado
  return (
    (checkVoid ? !valorVazio : true) &&
    fields.reduce((pV, cV) => (pV ? true : cV?.includes(value)), false)
  );
}
export function sweepObject(object) {
  let lista = Object.values(object);
  lista = lista.map((e) =>
    typeof e === 'object' && e !== null ? Object.values(e) : e
  );
  lista = lista.flat(5);
  lista = lista.map((e) =>
    typeof e === 'object' && e !== null ? Object.values(e) : e
  );
  lista = lista.flat(5);
  lista = lista.map((e) =>
    typeof e === 'object' && e !== null ? Object.values(e) : e
  );
  lista = lista.flat(5);
  return lista;
}

export const fakeReceivers = [
  {
    id: 'a111b111c111',
    fullName: 'Caio Soares',
    warName: 'Soares',
    classYear: '2019',
    cpf: '46077534838',
  },
  {
    id: 'a222b222c222',
    fullName: 'Vinicius Amancio',
    warName: 'Amancio',
    classYear: '2019',
    cpf: '12345678910',
  },
  {
    id: 'a333b333c333',
    fullName: 'Carol Castro',
    warName: 'Carol',
    classYear: '2019',
    cpf: '98765432145',
  },
];
