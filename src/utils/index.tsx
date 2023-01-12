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
        warName: gerador('Mariane Mocker', 'Fagundes', 'Victoria'),
        classYear: gerador('2020', '2021', '2022'),
        cpf: gerador('126.882.218-33', '377.466.108-11', '430.103.428-53'),
        identity: gerador('20YS0162', '21YS0241', '22YS0121'),
      },
      created_at: gerador(
        '2021-06-25 14:35:22',
        '2021-06-26 09:35:22',
        '2021-04-27 12:15:22'
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
          warName: gerador('Mariane Mocker', 'Fagundes', 'Victoria'),
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
          warName: gerador('Mariane Mocker', 'Fagundes', 'Victoria'),
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
export const exampleReceivers = (q) => {
  let bigReceivers = new Array(q);
  bigReceivers.fill(1);
  bigReceivers = bigReceivers.map((e, i) => {
    return {
      id: i,
      fullName: gerador('Caio Soares', 'Vinicius Amancio', 'Carol Castro'),
      warName: gerador('Soares', 'Vinicius', 'Castro'),
      classYear: gerador('2018', '2019', '2022'),
      identity: gerador('18YS1920', '19YS0192', '22YS0182'),
      cpf: gerador('49503940509', '19204958322', '29304958472'),
    };
  });
  return bigReceivers;
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

export function findReceiverName(receiver) {
  if (!receiver) return '';
  if (receiver.person?.cadet) {
    //se for cadete
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.person.cadet.classYear;
    if (currentYear - classYear < 4) {
      //cadete
      return `C${currentYear - classYear + 1} ${receiver.person.warName}`;
    } else {
      //cadete formado
      return `FORMADO ${classYear + 3} ${receiver.destiny.warName}`;
    }
  } else if (receiver.person?.staff)
    //se for funcionário
    return `${receiver.person.staff.rank} ${receiver.person.warName}`;
  else return receiver.workPlace.abbreviation; //se for seção
}

export function findReceiverData(receiver) {
  if (!receiver) return undefined;
  if (receiver.person?.cadet) {
    //se for cadete
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.person.cadet.classYear;
    if (currentYear - classYear < 4) {
      //cadete
      return {
        id: receiver.id,
        fullName: receiver.person.fullName,
        warName: `C${currentYear - classYear + 1} ${receiver.person.warName}`,
        cpf: receiver.person.cpf,
        identity: receiver.person.identity,
        classYear: receiver.person.cadet.classYear,
      };
    } else {
      //cadete formado
      return {
        id: receiver.id,
        fullName: receiver.person.fullName,
        warName: `FORMADO ${classYear + 3} ${receiver.destiny.warName}`,
        cpf: receiver.person.cpf,
        identity: receiver.person.identity,
        classYear: receiver.person.cadet.classYear,
      };
    }
  } else if (receiver.person?.staff)
    //se for funcionário
    return {
      id: receiver.id,
      fullName: receiver.person.fullName,
      warName: `${receiver.person.staff.rank} ${receiver.person.warName}`,
      cpf: receiver.person.cpf,
      identity: receiver.person.identity,
      rank: receiver.person.staff.rank,
    };
  else
    return {
      //se for seção
      id: receiver.id,
      abbreviation: receiver.workPlace.abbreviation,
      name: receiver.workPlace.name,
    };
}

export function correctDate(date) {
  if (!date) return undefined;
  //transformando a string Date recebida do backend em uma data mais amigável para o usuário
  const cDate = new Date(date);
  const newDate =
    cDate.getDate().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) +
    '/' +
    (cDate.getMonth() + 1).toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
    }) +
    '/' +
    cDate.getFullYear();
  return newDate;
}

export function correctReceiver(receiver) {
  const curYear = new Date().getUTCFullYear();
  //Nota: Apenas cadetes possuem 'classYear'
  //Transformando cadetes dos ultimos 4 anos em C1 C2 C3 C4, cadetes já formados em FORMADOS
  // e como militares não pososuem classYear não recebem nada em seus nomes!!
  if (receiver.classYear) {
    const dClassYear = receiver.classYear;
    if (curYear - dClassYear < 4) {
      //mail.destiny.fullName = "C" + (curYear - dClassYear + 1) + " " + mail.destiny.fullName;
      receiver.warName =
        'C' + (curYear - dClassYear + 1) + ' ' + receiver.warName;
    } else {
      //mail.destiny.fullName = "FORMADO " + mail.destiny.fullName;
      receiver.warName = 'FORMADO ' + receiver.warName;
    }
  }
}

export function invertStringDate(date: string) {
  return date.split('/').reverse().join('/');
}
