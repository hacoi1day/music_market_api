import slugify from 'slugify';

export const generateSlug = (str: string): string => {
  return slugify(str, {
    lower: true,
    strict: true,
  });
};

export const generateFileNameSlug = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return filename;
  }

  const name = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex);

  const slugifiedName = slugify(name);

  return `${slugifiedName}${extension}`;
};
