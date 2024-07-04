// import { useFieldArray } from "react-hook-form";
// import { AiOutlinePlus } from "react-icons/ai";
// import { RxCross2 } from "react-icons/rx";

// import Combobox from "~components/common/Combobox";
// import InputFloatNumber from "~components/common/InputFloatNumber";
// import InputPositiveNumber from "~components/common/InputPositiveNumber";
// import { Button } from "~components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "~components/ui/card";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
// import { Input } from "~components/ui/input";
// import useMealKit from "~hooks/useMealKit";

// const FormItems = () => {
//   const { form } = useMealKit();
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "mealKits",
//   });
//   return (
//     <>
//       <FormField
//         control={form.control}
//         name={"name"}
//         render={({ field }) => (
//           <FormItem className="flex flex-col w-[500px]">
//             <FormLabel>Tên công thức</FormLabel>
//             <FormControl>
//               <Combobox
//                 options={[{ value: "1", label: "kg" }]}
//                 onValueChange={field.onChange}
//                 value={field.value as string}
//                 placeholder="Chọn đơn vị"
//                 notFoundText="Không tìm thấy đơn vị"
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <div className="flex flex-col justify-center mt-4">
//         {fields.map((field, index) => (
//           <Card className="mt-4 w-[500px]" key={field.id}>
//             <CardHeader>
//               <CardTitle>Gói nguyên liệu {index + 1}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-row flex-wrap gap-3 items-start ">
//                 <div className="flex flex-row gap-6">
//                   <FormField
//                     control={form.control}
//                     name={`mealKits.${index}.mealKit.serving`}
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col w-60">
//                         <FormLabel>Khẩu phần</FormLabel>
//                         <FormControl>
//                           <InputPositiveNumber
//                             value={field.value as number}
//                             onValueChange={field.onChange}
//                             placeholder="Nhập số lượng"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`mealKits.${index}.mealKit.price`}
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col w-40 ">
//                         <FormLabel>Giá</FormLabel>
//                         <FormControl>
//                           <InputFloatNumber
//                             value={field.value as number}
//                             placeholder={"Nhập giá tiền"}
//                             onValueChange={(value) => {
//                               field.onChange(value);
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <CardTitle className="my-4">Gói gia vị</CardTitle>
//                 <div className="flex flex-row gap-6">
//                   <FormField
//                     control={form.control}
//                     name={`mealKits.${index}.extraSpice.name`}
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col w-60">
//                         <FormLabel>Tên gia vị</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="text"
//                             value={field.value as string}
//                             onChange={field.onChange}
//                             placeholder="Nhập tên gia vị"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`mealKits.${index}.extraSpice.price`}
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col w-40">
//                         <FormLabel>Giá gia vị</FormLabel>
//                         <FormControl>
//                           <InputFloatNumber
//                             value={field.value as number}
//                             placeholder={"Nhập giá tiền"}
//                             onValueChange={(value) => {
//                               field.onChange(value);
//                             }}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {index > 0 && (
//                   <Button
//                     variant={"ghost"}
//                     size={"icon"}
//                     onClick={() => {
//                       remove(index);
//                     }}
//                     className="mt-8"
//                   >
//                     <RxCross2 color="black" size={24} />
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//         <Button
//           className="mt-5 gap-1"
//           type="button"
//           onClick={() =>
//             append({
//               mealKit: {
//                 serving: 1,
//                 price: 1,
//               },
//               extraSpice: {
//                 image: new ,
//                 name: "",
//                 price: 0,
//               },
//             })
//           }
//         >
//           <AiOutlinePlus /> Thêm chất dinh dưỡng
//         </Button>
//       </div>
//     </>
//   );
// };

// export default FormItems;
