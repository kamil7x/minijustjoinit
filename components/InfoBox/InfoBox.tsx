import { Label, Stack, Text } from '@fluentui/react';

interface Props {
  label: string;
  value: React.ReactNode;
}

export const InfoBox = ({ label, value }: Props) => {
  return (
    <Stack>
      <Label>{label}</Label>
      <Text>{value}</Text>
    </Stack>
  );
};
