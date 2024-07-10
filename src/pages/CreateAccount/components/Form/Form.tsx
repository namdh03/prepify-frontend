import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { GET_AREAS_QUERY_KEY, GET_AREAS_STALE_TIME, getAreas } from "~apis/area.api";
import Combobox from "~components/common/Combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import useAccount from "~hooks/useAccount";
import { ACCOUNT_ROLE_TEXT_MAP } from "~utils/constants";
import { Role } from "~utils/enums";

const FormItems = () => {
  const { form } = useAccount();
  const { data } = useQuery({
    queryKey: [GET_AREAS_QUERY_KEY],
    queryFn: () => getAreas(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    staleTime: GET_AREAS_STALE_TIME,
  });

  const [isShipper, setIsShipper] = useState(true);
  return (
    <div>
      <FormField
        control={form.control}
        name={"fullname"}
        render={({ field }) => (
          <FormItem className="flex flex-col w-[500px]">
            <FormLabel>Tên người dùng</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={field.value as string}
                onChange={field.onChange}
                placeholder="Nhập tên người dùng"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-row flex-wrap gap-3 items-start justify-between my-6 ">
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Nhập tên email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"phone"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Nhập số điện thoại"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-3 items-start justify-between my-6 ">
        <FormField
          control={form.control}
          name={"identityCard"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>CCCD</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Nhập căn cứ công dân"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"role"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>Chức vụ</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value as Role);
                  setIsShipper(value === Role.SHIPPER);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Role.SHIPPER}>{ACCOUNT_ROLE_TEXT_MAP.SHIPPER}</SelectItem>
                  <SelectItem value={Role.MODERATOR}>{ACCOUNT_ROLE_TEXT_MAP.MODERATOR}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {isShipper && (
        <>
          <FormField
            control={form.control}
            name={"areaId"}
            render={({ field }) => (
              <FormItem className="flex flex-col w-[500px] my-6">
                <FormLabel>Quận, huyện</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      data?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    value={field.value as string}
                    placeholder="Chọn khu vực"
                    notFoundText="Không tìm thấy khu vực"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"address"}
            render={({ field }) => (
              <FormItem className="flex flex-col w-[500px] my-6">
                <FormLabel>Địa chỉ cụ thể</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value as string}
                    onChange={field.onChange}
                    placeholder="Nhập tên địa chỉ nhà"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default FormItems;
