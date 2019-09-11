export function sortByType(data, sortingType, sorting) {
  switch (sortingType) {
    case 'phone':
      return sortByPhone(data, sorting);
    case 'name':
      return sortByName(data, sorting);
  }
}

export function sortByPhone(data, sorting) {
  if (sorting) {
    data.sort(function (a, b) {
      let phoneA = a.phone.toLowerCase(), phoneB = b.phone.toLowerCase();
      if (phoneA < phoneB)
        return -1;
      if (phoneA > phoneB)
        return 1;
      return 0
    });
  } else {
    data.sort(function (a, b) {
      let phoneA = a.phone.toLowerCase(), phoneB = b.phone.toLowerCase();
      if (phoneA > phoneB)
        return -1;
      if (phoneA < phoneB)
        return 1;
      return 0
    });
  }
}

export function sortByName(data, sorting) {
  if (sorting) {
    data.sort(function (a, b) {
      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0
    });
  } else {
    data.sort(function (a, b) {
      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA > nameB)
        return -1;
      if (nameA < nameB)
        return 1;
      return 0
    });
  }
}
