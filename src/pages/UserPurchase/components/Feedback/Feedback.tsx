import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import CommentRatings from "~components/common/CommentRatings";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~components/ui/alert-dialog";
import { Button } from "~components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Separator } from "~components/ui/separator";
import { Textarea } from "~components/ui/textarea";
import feedbackSchema from "~pages/UserPurchase/data/schema";
import { OrderItem as OrderItemType } from "~types/order.type";

import Images from "../Images";
import OrderItem from "../OrderItem";

interface FeedbackProps {
  trigger?: ReactNode;
  orderItems: OrderItemType[];
  open: boolean;
  onClose?: () => void;
}

export type FeedbackFormType = z.infer<typeof feedbackSchema>;

const Feedback = ({ trigger, orderItems, open, onClose }: FeedbackProps) => {
  const form = useForm<FeedbackFormType>({
    mode: "all",
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: orderItems.map((orderItem) => ({
        id: orderItem.id,
        content: "",
        rating: 5,
        images: [],
      })),
    },
  });

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return <span className="text-muted-foreground text-base">Tệ</span>;
      case 2:
        return <span className="text-muted-foreground text-base">Không hài lòng</span>;
      case 3:
        return <span className="text-muted-foreground text-base">Bình thường</span>;
      case 4:
        return <span className="text-primary text-base">Hài lòng</span>;
      case 5:
        return <span className="text-primary text-base">Tuyệt vời</span>;
      default:
        return "Chưa đánh giá";
    }
  };

  const onSubmit = (values: FeedbackFormType) => {
    console.log(values);
    onClose && onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#222] text-xl font-normal">Đánh Giá Sản Phẩm</AlertDialogTitle>
          <AlertDialogDescription>
            Đánh giá sản phẩm để giúp chúng tôi cải thiện chất lượng dịch vụ
          </AlertDialogDescription>
        </AlertDialogHeader>

        <section className="max-h-96 overflow-y-auto no-scrollbar">
          {orderItems.map((orderItem, orderItemIndex) => (
            <article key={orderItem.id}>
              <OrderItem {...orderItem} />

              <Form {...form}>
                <form id="feedback-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-3">
                  <FormField
                    control={form.control}
                    name={`feedback.${orderItemIndex}.rating`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-[10px]">
                          <FormLabel>Chất lượng sản phẩm:</FormLabel>

                          <CommentRatings
                            size={26}
                            rating={5}
                            variant={"yellow"}
                            className="[&_svg]:cursor-pointer"
                            descriptionRating={getRatingText}
                            onRatingChange={(rating) => field.onChange(rating)}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`feedback.${orderItemIndex}.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung đánh giá:</FormLabel>
                        <FormControl>
                          <div className="px-1">
                            <Textarea
                              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                              className="min-h-20 no-scrollbar "
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Images orderItemIndex={orderItemIndex} form={form} />
                </form>
              </Form>

              <Separator className="mt-8" />
            </article>
          ))}
        </section>

        <AlertDialogFooter>
          <Button variant={"outline"} type="button" onClick={onClose}>
            TRỞ LẠI
          </Button>
          <Button form="feedback-form">Hoàn Thành</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Feedback;
