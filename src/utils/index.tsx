import { Cadet, Staff, WorkPlace } from '../interfaces';

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

export function findReceiverName(receiver: Staff | WorkPlace | Cadet) {
  if (!receiver) return '';
  if ('classYear' in receiver) {
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.classYear;
    if (currentYear - classYear < 4) {
      return `C${currentYear - classYear + 1} ${receiver.warName} - ${
        receiver.fullName
      }`;
    } else {
      return `FORMADO ${classYear + 3} ${receiver.warName} - ${
        receiver.fullName
      }`;
    }
  } else if ('rank' in receiver)
    return `${receiver.rank} ${receiver.warName} - ${receiver.fullName}`;
  else return `${receiver.abbreviation} - ${receiver.name}`; //se for seção
}

export function findReceiverShortName(receiver: Staff | WorkPlace | Cadet) {
  if (!receiver) return '';
  if ('classYear' in receiver) {
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.classYear;
    if (currentYear - classYear < 4) {
      return `C${currentYear - classYear + 1} ${receiver.warName}`;
    } else {
      return `FORMADO ${classYear + 3} ${receiver.warName}`;
    }
  } else if ('rank' in receiver) return `${receiver.rank} ${receiver.warName}`;
  else return `${receiver.abbreviation}`; //se for seção
}

export function invertStringDate(date: string) {
  return date ? date.split('/').reverse().join('/') : '';
}
