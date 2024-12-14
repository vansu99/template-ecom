import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import useModalStore from '@/stores/useModalStore';
import { Button } from '../ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ModalLayoutProps {
  title?: string;
  children: ReactNode;
  layout?: 'normal' | 'form';
  renderFooterActions?: boolean;
  classNameContent?: string;
}

const ModalLayout = ({
  title,
  layout = 'normal',
  children,
  classNameContent,
}: ModalLayoutProps) => {
  const { isOpen, onClose } = useModalStore();

  const handleClose = () => {
    onClose?.();
  };

  const renderLayoutNormal = (
    <DialogContent className="min-h-[20rem]">
      <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
      <DialogDescription>{children}</DialogDescription>
    </DialogContent>
  );

  const renderLayoutForm = (
    <DialogContent className={cn('max-h-[55rem]', classNameContent)}>
      <DialogHeader>{title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
      <DialogDescription>
        <ScrollArea className="h-[45rem]">{children}</ScrollArea>
      </DialogDescription>
      <DialogFooter className="mt-auto">
        <Button type="button" variant={'outline'} onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {layout === 'normal' && renderLayoutNormal}
      {layout === 'form' && renderLayoutForm}
    </Dialog>
  );
};

export default ModalLayout;
